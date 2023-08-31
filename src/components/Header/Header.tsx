import React, {ChangeEvent, useState} from 'react';
import style from './Header.module.scss'
import {Button} from '../UI/Button/Button';
import {Input} from '../UI/Input/Input';
import {Select} from '../Select/Select';

export const Header = () => {

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearch(event.target.value)
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
      <form>
        <Input type='search' value={search} onChange={onChangeHandler}
          placeholder={'Please, enter book title'}/>
        <Button>Search</Button>
      </form>

      <div className={style.selects}>
        <h4>Categories</h4>
        <Select options={categoryOptions}  value={sort} onChange={value => setSort(value)}/>

        <h4>Sorting by</h4>
        <Select options={sortingOptions} value={sort} onChange={value => setSort(value)}></Select>

      </div>

    </header>
  );
};

