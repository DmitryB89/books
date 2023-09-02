import React, {FC} from 'react';
import style from './SingleBook.module.scss'

type SingleBookPropsType = {
  kind: string,
  authors: string[]
  title: string
  cover: string
}

export const SingleBook: FC<SingleBookPropsType> = ({kind, authors, title, cover}) => {


  return (
    <div className={style.singleBook}>
      <div className={style.bookCover}>
        <img src={cover} alt={'bookTitle'}/>
      </div>
      <div className={style.textBlock}>
        <p>{kind}</p>
        <p>{authors}</p>
        <p>{title}</p>
        <p>Lewis Carroll</p>
      </div>
    </div>
  );
};

