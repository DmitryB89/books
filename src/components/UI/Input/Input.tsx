import React, {ChangeEvent, FC, KeyboardEvent} from 'react';

type InputPropsType = {
  children?: React.ReactNode

  type:string
    placeholder:string
    value:string
    onChange:(e: ChangeEvent<HTMLInputElement>) => void
  onKeyPress?:(e:KeyboardEvent<HTMLInputElement>) => void
}

export const Input:FC<InputPropsType> = ({children,...props}) => {
  return (
    <input {...props}>
      {children}
    </input>
  );
};
