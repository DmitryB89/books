import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BASE_URL, MAX_RESULTS} from '../utils/constants';
import {InitialStateType, ThunkAPIType, ResponseType} from './types';

const initialState: InitialStateType = {
  books: [],
  totalItems: 0,
  isLoading: false,
  error: null,
  category: 'all',
  sort: 'relevance',
  search: '',
  limit: 0,
};

export const fetchBooks = createAsyncThunk<ResponseType, number | undefined, ThunkAPIType>('books/fetchBooks',
  async (limit = 0, {getState, dispatch, rejectWithValue}) => {
    const {category, sort, search} = getState().books;
    const subject = category === 'all' ? '' : category;
    const queryParams = `intitle:${search}+subject:${subject}&orderBy=${sort}&startIndex=${limit}&maxResults=${MAX_RESULTS}&key=${process.env.REACT_APP_KEY}`;
    dispatch(changeLimit(limit));
    try {
      const res = await fetch(BASE_URL + queryParams);
      return res.json();
    } catch (e) {
      return rejectWithValue('Something went wrong...');
    }
  },
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    changeSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    changeSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    changeLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchBooks.fulfilled,
        (state, action: PayloadAction<ResponseType>) => {
          state.isLoading = false;
          state.books = state.limit === 0 ? action.payload.items : [...state.books, ...action.payload.items];
          state.totalItems = action.payload.totalItems;
          state.error = null;
        },
      )
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const {changeCategory, changeSort, changeSearch, changeLimit} = booksSlice.actions;
export default booksSlice.reducer;
