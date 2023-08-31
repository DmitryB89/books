import React, {FC} from 'react';

type ButtonPropsType = {
    children: React.ReactNode
    disabled?:boolean
}

export const Button: FC<ButtonPropsType> = ({children, ...props}) => {
  return (
    <button {...props}>{children}</button>

  );
};

