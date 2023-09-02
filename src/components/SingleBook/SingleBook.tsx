import React from 'react';
import style from './SingleBook.module.scss'


export const SingleBook = () => {
  return (
    <div className={style.singleBook}>
      <div className={style.bookCover}>
        <img src={'https://bookcity.uk/upload/iblock/c08/c08151b9666c56910b3c5507d264c77b.jpg'} alt={'bookTitle'} />
      </div>
      <div className={style.textBlock}>
        <p>Fantasy</p>
        <p>Alice in Wonderland</p>
        <p>Alice in Wonderland</p>
        <p>Lewis Carroll</p>
      </div>
    </div>
  );
};

