import React, {useEffect, useState} from 'react';
import styles from './Main.module.scss'
import {SingleBook} from '../components/SingleBook/SingleBook';
import {Header} from '../components/Header/Header';
import { fetchBooks} from '../store/booksSlice';
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
  console.log(`value:${value}`)

  // console.log(currentPage < totalPages)

  const changeValue = () => {
    setValue(0)
  }
  console.log(Number(value) < Number(totalItems))
  return (
    <>
      <Header changeValue={changeValue}/>
      {isLoading ? <Loader/> : <div className={styles.booksListWrapper}>
        <p>Books Found: {totalItems}</p>
        <div className={styles.books}>
          {!!books?.length && books.map((book: ItemType) => {
            return <SingleBook key={book.etag} categories={book.volumeInfo.categories} authors={book.volumeInfo.authors} title={book.volumeInfo.title}
              cover={book?.volumeInfo?.imageLinks?.smallThumbnail ? book.volumeInfo.imageLinks.smallThumbnail : coverMockup}
            />
          })}
        </div>
        {/*{currentPage < totalPages &&<button onClick={onClickHandler}>Load more</button>}*/}
        <div className={styles.loadMore}>
          {value + 30 < totalItems && <Button onClick={onClickHandler}>Load more</Button>}
          {/*{<Button onClick={onClickHandler}>Load more</Button>}*/}
          {/*{currentPage < totalPages && <Button onClick={onClickHandler}>Load more</Button>}*/}
        </div>

        {/*{value < totalItems || totalItems > 30 ? <button onClick={onClickHandler}>Load more</button> : <></> }*/}
      </div>}
      {error && <Error error={error}/>}

    </>
  );
};

// {numResults > 30 && books.length < data.totalItems && (
//   <Button type="button" onClick={() => dispatch(loadMoreAction())}>
//     Load More
//   </Button>
