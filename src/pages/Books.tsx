import React from 'react';
import styles from './Books.module.scss'
import {SingleBook} from '../components/SingleBook/SingleBook';
import {Header} from '../components/Header/Header';
import {ItemType} from '../store/booksSlice';
import {useAppSelector} from '../hooks/hooks';
import coverMockup from '../assets/bookPrev.jpg'



export const Books = () => {
  const {books, isLoading, error, totalItems} = useAppSelector(state => state.books)


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
        {/*{JSON.stringify(books)}*/}
        <p>Books Found: {totalItems}</p>
        <div className={styles.books}>
          {books.length && books.map((book: ItemType) => {
            console.log( book.volumeInfo.imageLinks.smallThumbnail)
            return <SingleBook key={book.id} categories={book.volumeInfo.categories} authors={book.volumeInfo.authors} title={book.volumeInfo.title}
              cover={book.volumeInfo.imageLinks.smallThumbnail  ? book.volumeInfo.imageLinks.smallThumbnail : coverMockup}

            />
          })}
        </div>

      </div>
    </>
  );
};

// AIzaSyCks-FGFh7cLpuGuG7nJesq86eRsvKkFtw