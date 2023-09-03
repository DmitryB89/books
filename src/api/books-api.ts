import {ResponseType} from '../store/booksSlice';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/volumes?q=',
  withCredentials: true,
  headers: {
    Authorization:'AIzaSyCks-FGFh7cLpuGuG7nJesq86eRsvKkFtw',
    // 'API-KEY': 'AIzaSyCks-FGFh7cLpuGuG7nJesq86eRsvKkFtw',
  },
})

// api
export const booksAPI = {
  fetchBooks() {
    return instance.get<ResponseType>('');
  },

}