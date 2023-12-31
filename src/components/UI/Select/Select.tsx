import React, {ChangeEvent} from 'react';

type OptionType = {
  value: string
  label: string
}

type SelectPropsType = {
  options: OptionType[]
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  ariaLabel: string
  id: string
}

export const Select = ({options, value, onChange, ariaLabel, id}: SelectPropsType) => {
  return (
    <select value={value} onChange={onChange} aria-label={ariaLabel} id={id}>
      {options.map(option =>
        <option value={option.value} key={option.value}>
          {option.label}
        </option>,
      )}
    </select>
  );
};
