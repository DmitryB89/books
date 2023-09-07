import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import style from './Header.module.scss'
import {Button} from '../UI/Button/Button';
import {Input} from '../UI/Input/Input';
import {Select} from '../UI/Select/Select';
import {changeCategory, changeSearch, changeSort, fetchBooks} from '../../store/booksSlice';
import {useAppDispatch} from '../../hooks/hooks';
import {categoryOptions} from '../../utils/options'
import {sortingOptions} from '../../utils/options'
import searchIcon from '../../assets/loupe.png'



export const Header = () => {
  const dispatch = useAppDispatch()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('relevance')

  const onClickHandler = () => {
    dispatch(changeSearch(search))
    dispatch(changeCategory(filter))
    dispatch(changeSort(sort))
    dispatch(fetchBooks())
    console.log(search, filter, sort)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)
    console.log(search)
  }

  const onChangeSortSelectHandler = (value: string) => {

    setSort(value)
    console.log(value)
  }
  const onChangeFilterSelectHandler = (value: string) => {
    setFilter(value)
    console.log(value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(changeSearch(search))
      dispatch(changeCategory(filter))
      dispatch(changeSort(sort))
      dispatch(fetchBooks())
    }
  }

  return (
    <header className={style.headerWrapper}>
      <h1>Search for Books</h1>
      <div className={style.searchBlock}>
        <div className={style.inputBlock}>
          <Input type='search' value={search} onChange={onChangeHandler}
            placeholder={'Please, enter book title'} onKeyPress={onKeyPressHandler}/>
          <Button onClick={onClickHandler}>
            <img src={searchIcon} alt={'searchIcon'} className={style.searchIcon}></img>

          </Button>
        </div>
        <div className={style.selectsBlock}>

          <h4>Category</h4>
          <Select options={categoryOptions} value={filter} onChange={onChangeFilterSelectHandler}/>
          <h4>Sort by</h4>
          <Select options={sortingOptions} value={sort} onChange={onChangeSortSelectHandler}></Select>
        </div>
      </div>
    </header>
  );
};

