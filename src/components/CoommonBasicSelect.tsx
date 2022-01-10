import React from 'react';
import { css } from '@emotion/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TARGET } from '../features/types';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[] | undefined;
  label?: string;
  width?: number;
  name: string;
  value: string;
  index?: number;
  onChange: Function;
};

const CoommonBasicSelect = (props: Props) => {
  const handleSelectChange = (event: SelectChangeEvent) => {
    let target: TARGET = {
      name: props.name,
      value: event.target.value,
    };
    props.onChange(target);
  };

  return (
    <div>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Age</InputLabel>
        <Select
          value={props.value}
          onChange={handleSelectChange}
          label={props.label}
          inputProps={{
            shrink: true,
          }}
        >
          {props.options &&
            props.options.map((option) => (
              <MenuItem value={option.value}>{option.label}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CoommonBasicSelect;
