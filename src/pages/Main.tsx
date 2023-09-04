import React, {useEffect, useRef, useState} from 'react';
import styles from './Main.module.scss'
import {SingleBook} from '../components/SingleBook/SingleBook';
import {Header} from '../components/Header/Header';
import {fetchBooks, ItemType} from '../store/booksSlice';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import coverMockup from '../assets/bookPrev.jpg'
import {MAX_RESULTS} from '../utils/constants';


export const Main = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState(0)
  useEffect(() => {
    dispatch(fetchBooks(value))
  }, [value])
  const onClickHandler = () => {
    setValue((value) => value + MAX_RESULTS)
  }

  const {books, isLoading, error, totalItems} = useAppSelector(state => state.books)


  // async function fetchBooks() {
  //   const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=search+terms');
  //   const books = await response.json();
  //   console.log(books);
  // }
  // const fetchBooks = () => {
  //   axios.get('https://www.googleapis.com/books/v1/volumes?q=flowers').then(res => console.log(res.data)).catch(err => console.log(err));
  // }
  // const onClickHandler = () => {
  //   setIndex((index) => {
  //     return  index+1
  //   })
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
          {!!books?.length && books.map((book: ItemType) => {
            return <SingleBook key={book.etag} categories={book.volumeInfo.categories} authors={book.volumeInfo.authors} title={book.volumeInfo.title}
              cover={book?.volumeInfo?.imageLinks?.smallThumbnail ? book.volumeInfo.imageLinks.smallThumbnail : coverMockup}

            />
          })}
        </div>
        <button onClick={onClickHandler}>LOAD MORE</button>

      </div>
    </>
  );
};

// AIzaSyCks-FGFh7cLpuGuG7nJesq86eRsvKkFtw