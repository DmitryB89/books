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

type PropsType = {
  changeValue: () => void
}

export const Header = ({changeValue}: PropsType) => {
  const dispatch = useAppDispatch()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('relevance')

  const onClickHandler = () => {
    dispatch(changeSearch(search))
    dispatch(changeCategory(filter))
    dispatch(changeSort(sort))
    changeValue()
    dispatch(fetchBooks())
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    changeValue()
  }

  const onChangeSortSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value)
    changeValue()
  }

  const onChangeFilterSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value)
    changeValue()
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(changeSearch(search))
      dispatch(changeCategory(filter))
      dispatch(changeSort(sort))
      dispatch(fetchBooks())
      changeValue()
    }
  }

  return (
    <header className={style.headerWrapper}>
      <h1>Search for Books</h1>
      <div className={style.searchBlock}>
        <div className={style.selectsBlock}>
          <div className={style.labelContainer}>
            <label htmlFor='category'>Category</label>
            <Select options={categoryOptions} value={filter} onChange={onChangeFilterSelectHandler} ariaLabel={'category'} id={'category'}/>
          </div>
          <div className={style.labelContainer}>
            <label htmlFor='sort'>Sort by</label>
            <Select options={sortingOptions} value={sort} onChange={onChangeSortSelectHandler} ariaLabel={'sort'}
              id={'sort'}></Select>
          </div>
        </div>
        <div className={style.inputBlock}>
          <Input type='search' value={search} onChange={onChangeHandler}
            placeholder={'Please, enter book title'} onKeyPress={onKeyPressHandler}/>
          <Button onClick={onClickHandler}>
            <img src={searchIcon} alt={'searchIcon'} className={style.searchIcon}></img>
          </Button>
        </div>
      </div>
    </header>
  );
};

