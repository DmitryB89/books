import {configureStore} from '@reduxjs/toolkit';
import booksReducer from './booksSlice'

const store = configureStore({
  reducer:{
    books:booksReducer,
  },
})

export default store
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch