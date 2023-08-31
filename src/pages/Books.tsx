import React, {useEffect} from 'react';
import styles from './Books.module.scss'
import {SingleBook} from '../components/SingleBook/SingleBook';
import {Header} from '../components/Header/Header';


export const Books = () => {
  useEffect(() => {
    fetchBooks()
  },[])

  async function fetchBooks() {
    const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=search+terms');
    const books = await response.json();
    console.log(books);
  }

  return (
    <>
      <Header/>
      <div className={styles.booksListWrapper}>
        <p>Books Found: 355</p>
        <SingleBook/>

      </div>
    </>
  );
};

// AIzaSyCks-FGFh7cLpuGuG7nJesq86eRsvKkFtw