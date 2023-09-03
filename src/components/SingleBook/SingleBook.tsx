import React, {FC} from 'react';
import style from './SingleBook.module.scss'

type SingleBookPropsType = {
  categories: string[],
  authors: string[]
  title: string
  cover?: string
}



export const SingleBook: FC<SingleBookPropsType> = ({categories, authors, title, cover}) => {


  return (
    <div className={style.singleBook}>
      <div className={style.bookCover}>
        <img src={cover} alt={'bookTitle'}/>
      </div>
      <div className={style.textBlock}>
        {categories ? <p>{categories[0]}</p>: ''}
        <div>{authors ? authors.map((author, index) => {
          return <p key={index}>{author}</p>
        }) : ''}</div>
        <p>{title}</p>
      </div>

    </div>
  );
};

