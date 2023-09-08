import React, {useEffect, useState} from 'react';
import styles from './Main.module.scss'
import {SingleBook} from '../components/SingleBook/SingleBook';
import {Header} from '../components/Header/Header';
import {fetchBooks} from '../store/booksSlice';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import coverMockup from '../assets/bookPrev.jpg'
import {MAX_RESULTS} from '../utils/constants';
import {Loader} from '../components/Loader/Loader';
import Error from '../components/Error/Error'
import {ItemType} from '../store/types';
import {Button} from '../components/UI/Button/Button';

export const Main = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState(0)
  const totalItems = useAppSelector(state => state.books.totalItems)
  const {books, isLoading, error} = useAppSelector(state => state.books)

  useEffect(() => {
    value && dispatch(fetchBooks(value))
  }, [value])
  const onClickHandler = () => {
    setValue(value => value + MAX_RESULTS)
  }

  const changeValue = () => {
    setValue(0)
  }
  return (
    <>
      <Header changeValue={changeValue}/>
      {isLoading ? <Loader/> : <div className={styles.booksListWrapper}>
        <p>Books Found: {totalItems}</p>
        <div className={styles.books}>
          {!!books?.length && books.map((book: ItemType) => {
            const {etag} = book
            const {categories, authors, title, imageLinks} = book?.volumeInfo
            return <SingleBook key={etag} categories={categories} authors={authors} title={title}
              cover={imageLinks?.smallThumbnail ? imageLinks.smallThumbnail : coverMockup}/>
          })}
        </div>
        <div className={styles.loadMore}>
          {value + MAX_RESULTS < totalItems && <Button onClick={onClickHandler}>Load more</Button>}
        </div>
      </div>}
      {error && <Error error={error}/>}
    </>
  );
};
