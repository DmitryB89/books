import React, {useEffect} from 'react';
import styles from './Books.module.scss'
import {SingleBook} from '../components/SingleBook/SingleBook';
import {Header} from '../components/Header/Header';
import {fetchBooks} from '../store/booksSlice';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';



export const Books = () => {
  const dispatch = useAppDispatch()
  const {books,isLoading,error}=useAppSelector(state => state.books)

  useEffect(() => {
    dispatch(fetchBooks())
  },[])

  // async function fetchBooks() {
  //   const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=search+terms');
  //   const books = await response.json();
  //   console.log(books);
  // }
  // const fetchBooks = () => {
  //   axios.get('https://www.googleapis.com/books/v1/volumes?q=flowers').then(res => console.log(res.data)).catch(err => console.log(err));
  // }

  return (
    <>
      <Header/>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      <div className={styles.booksListWrapper}>
        {JSON.stringify(books)}
        <p>Books Found: 355</p>
        <SingleBook />

      </div>
    </>
  );
};

// AIzaSyCks-FGFh7cLpuGuG7nJesq86eRsvKkFtw