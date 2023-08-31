import React, {ChangeEvent, FC} from 'react';

type InputPropsType = {
    type:string
    placeholder:string
    value:string
    onChange:(event:ChangeEvent<HTMLInputElement>) => void
}

export const Input:FC<InputPropsType> = ({...props}) => {
  return (
    <input {...props}>

    </input>
  );
};
