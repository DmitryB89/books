import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootStateType} from './store';
import {MAX_RESULTS} from '../utils/constants';

const key = 'AIzaSyCks-FGFh7cLpuGuG7nJesq86eRsvKkFtw'
export type VolumeInfoType = {
  title: string
  authors: string[]
  imageLinks: {
    smallThumbnail: string
  },
  categories: string[]
}

export type ItemType = {
  id: string
  etag: string
  selfLink: string
  volumeInfo: VolumeInfoType
}

export type ResponseType = {
  kind: string
  items: ItemType[]
  totalItems: number
}


export type ThunkAPIType = {
  rejectValue: string
  state: RootStateType
}

export const fetchBooks = createAsyncThunk<ResponseType, number | undefined, ThunkAPIType>
('books/fetchBooks', async (index = 0, thunkAPI) => {
  const {category, sort, search} = thunkAPI.getState().books
  // const queryParams = `${search}subject:${filter}&orderBy=${sort}&key=${key}`
  thunkAPI.dispatch(changeLimit(index))
  // const queryParams = `${search}+intitle:${search}+subject:${category}&orderBy=${sort}&startIndex=${index}&maxResults=${MAX_RESULTS}=${key}`
  // const queryParams2 = `${search}+intitle:${search}&orderBy=${sort}&startIndex=${index}&maxResults=${MAX_RESULTS}&key=${key}`
  try {
    // const response = await axios.get<ResponseType>('https://www.googleapis.com/books/v1/volumes?q=' + search + `&key=${key}`)
    const response = await axios.get<ResponseType>('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: search,
        intitle: decodeURI(`${search}+`),
        // intitle,
        subject: category === 'all' ? '': category,
        orderBy: sort,
        startIndex: index,
        maxResults: MAX_RESULTS,
        key: process.env.PROCESS_KEY,
      },
    })
    // console.log(response.data)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue('No books found on your request')
  }
})
// const queryParams = `${search}+intitle:${search}+subject:${filter}&orderBy=${sort}&startIndex=${index}&maxResults=30&key=${key}`
// const queryParams2 = `${search}+intitle:${search}&orderBy=${sort}&startIndex=${index}&maxResults=30&key=${key}`


// type SingleBookType = {
//   title: string
//   authors: string[]
//   imageLinks: {
//     smallThumbnail: string,
//     thumbnail: string
//   }
// }

type InitialStateType = {

  books: ItemType[]
  totalItems: number
  isLoading: boolean
  error: string | null
  startIndex?: number
  category: string
  sort: string
  search: string
  limit:number
}

const initialState: InitialStateType = {

  books: [],
  totalItems: 0,
  isLoading: false,
  error: null,
  startIndex: 0,
  category: 'all',
  sort: 'relevance',
  search: '',
  limit:0,
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    changeSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload
    },
    changeSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    changeLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        console.log(state.limit)
        state.isLoading = false
        state.books = state.limit === 0 ? action.payload.items : [...state.books, ...action.payload.items]
        state.totalItems = action.payload.totalItems
        state.error = ''
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload) {
          state.error = action.payload
        }
      })

  },
})

export const {changeCategory, changeSort, changeSearch,changeLimit} = booksSlice.actions
export default booksSlice.reducer

// {
//   smallThumbnail: string,
//     thumbnail: string
// }