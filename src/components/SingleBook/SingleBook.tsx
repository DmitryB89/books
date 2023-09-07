import React from 'react';
import style from './SingleBook.module.scss'
import {SingleBookPropsType} from './types';


export const SingleBook = ({categories, authors, title, cover}: SingleBookPropsType) => {

  return (
    <div className={style.singleBook}>
      <div className={style.bookCover}>
        <img src={cover} alt={'bookTitle'}/>
      </div>
      <div className={style.textBlock}>
        {!!categories?.length && <p className={style.category}>{categories[0]}</p>}
        <div className={style.authors}>{!!authors?.length && <p>{authors.join(',')}</p>}</div>
        <h4 className={style.title}>{title}</h4>
      </div>

    </div>
  );
};

// {title.length < 80
//   ? `${title}`
//   : `${title.substring(0, 40)}...`}