import React, {ChangeEvent, useState} from 'react';
import style from './Header.module.scss'
import {Button} from '../UI/Button/Button';
import {Input} from '../UI/Input/Input';
import {Select} from '../Select/Select';
import {fetchBooks} from '../../store/booksSlice';
import {useAppDispatch} from '../../hooks/hooks';

export const Header = () => {
  const dispatch = useAppDispatch()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('relevance')

  const onClickHandler = () => {
    dispatch(fetchBooks({search, filter, sort}))
    console.log(search, filter, sort)
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

    event.preventDefault()
    setSearch(event.target.value)
    console.log(search)
  }

  const onChangeSortSelectHandler = (value:string) => {

    setSort(value)
    console.log(value)
  }
  const onChangeFilterSelectHandler = (value:string) => {
    setFilter(value)
    console.log(value)
  }


  const categoryOptions = [
    {value: 'all', title: 'all'},
    {value: 'art', title: 'art'},
    {value: 'biography', title: 'biography'},
    {value: 'computers', title: 'computers'},
    {value: 'history', title: 'history'},
    {value: 'medical', title: 'medical'},
    {value: 'poetry', title: 'poetry'},
  ]

  const sortingOptions = [
    {value: 'relevance', title: 'relevance'},
    {value: 'newest', title: 'newest'},
  ]

  return (
    <header className={style.headerWrapper}>
      <h1>Search for Books</h1>
      <div >
        <Input type='search' value={search} onChange={onChangeHandler}
          placeholder={'Please, enter book title'}/>
        <button onClick={onClickHandler}>PRESS</button>
        <Button>Search</Button>
      </div>

      <div className={style.selects}>
        <h4>Categories</h4>
        <Select options={categoryOptions}  value={filter} onChange={onChangeFilterSelectHandler}/>

        <h4>Sorting by</h4>
        <Select options={sortingOptions} value={sort} onChange={onChangeSortSelectHandler}></Select>

      </div>

    </header>
  );
};

