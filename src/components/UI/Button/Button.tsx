import React, {FC} from 'react';

type ButtonPropsType = {
    children: React.ReactNode
    disabled?:boolean
  // onClick:()=>void
}

export const Button: FC<ButtonPropsType> = ({children, ...props}) => {
  return (
    <button {...props}>{children}</button>

  );
};

