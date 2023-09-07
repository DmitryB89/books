import React from 'react';

type ButtonPropsType = {
  children: React.ReactNode
  disabled?: boolean
  onClick: () => void
}

export const Button = ({children, ...props}: ButtonPropsType) => {
  return (
    <button {...props} >{children}</button>
  );
};

