import axios from 'axios';
import {ResponseType} from '../store/booksSlice';

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/volumes?q=',
  withCredentials: true,
  headers: {
    'API-KEY': 'AIzaSyCks-FGFh7cLpuGuG7nJesq86eRsvKkFtw',
  },
})

// api
export const booksAPI = {
  getBooks() {
    return instance.get<ResponseType>('search+terms');
  },

}