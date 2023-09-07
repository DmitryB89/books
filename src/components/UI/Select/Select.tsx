import React, {ChangeEvent, FC} from 'react';

type OptionType = {
    value:string
    title:string
}

type SelectPropsType = {
    options:OptionType[]
    value:string
    onChange:(arg:string) => void
    // defaultValue:string
}


export const Select:FC<SelectPropsType> = ({options,value, onChange}) => {

  const onChangeHandler = (event:ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value)
  }


  return (
    <select value={value} onChange={onChangeHandler}>
      {/*<option disabled value=''>{defaultValue}</option>*/}
      {options.map(option =>
        <option value={option.value} key={option.value}>
          {option.title}
        </option>,
      )}
    </select>
  );
};
