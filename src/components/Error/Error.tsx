import React from 'react';
import style from './Error.module.scss';
import {ERROR_GIF} from '../../utils/constants';

type PropsType = {
  error: string;
};
export const Error = ({ error }: PropsType) => {
  return (
    <div className={style.errorWrapper}>
      <div className={style.imgContainer}>
        <img src={ERROR_GIF} alt='image'/>
      </div>
      <div className={style.textContainer}>

        <h2>{error}</h2>
      </div>
    </div>
  );
};

export default Error;
