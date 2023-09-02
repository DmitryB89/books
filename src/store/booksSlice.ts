import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export type VolumeInfoType = {
  title: string
  authors: string[]
  imageLinks: {
    smallThumbnail: string,
    thumbnail: string
  }
}

export type ItemType = {
  kind: string
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


export const fetchBooks = createAsyncThunk<ResponseType, void, { rejectValue: string }>
('books/fetchBooks', async (_, thunkAPI) => {
  try {
    const response = await axios.get<ResponseType>('https://www.googleapis.com/books/v1/volumes?q=evil')
    JSON.stringify(response.data)
    console.log(response.data)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue('No books found on your request')
  }
})

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
}

const initialState: InitialStateType = {

  books: [],
  totalItems: 0,
  isLoading: false,
  error: null,
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.books = action.payload.items
        state.totalItems=action.payload.totalItems
        state.error = ''


      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload) {state.error = action.payload}
      })
  },
})

export const {} = booksSlice.actions
export default booksSlice.reducer