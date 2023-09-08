import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
  children?: React.ReactNode

  type:string
    placeholder:string
    value:string
    onChange:(e: ChangeEvent<HTMLInputElement>) => void
  onKeyPress?:(e:KeyboardEvent<HTMLInputElement>) => void
}

export const Input = ({children,...props}:InputPropsType) => {
  return (
    <input {...props}>
      {children}
    </input>
  );
};
