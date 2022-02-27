import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { TARGET } from '../features/types';
import { useDatePickerDefaultizedProps } from '@mui/lab/DatePicker/shared';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value: string[];
  label?: string;
  placeholder?: string;
  width?: number;
  name: string;
  index?: number;
  onChange: Function;
  readOnly?: boolean;
};

export default function CommonMultiSelect(props: Props) {
  const [selected, setSelected] = useState<Option[]>(
    props.options.filter((opt) => props.value.includes(opt.value))
  );

  const handleSelectedChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: Option[]
  ) => {
    setSelected(value);
    let target: TARGET = {
      name: props.name,
      value: value.map((option) => option.value),
    };
    props.onChange(target);
  };

  const compareOptionWithValue = (option: Option, value: Option) =>
    option.value === value.value;

  return (
    <Autocomplete
      multiple
      options={props.options}
      value={selected}
      isOptionEqualToValue={compareOptionWithValue}
      disableCloseOnSelect
      onChange={handleSelectedChange}
      getOptionLabel={(option) => option.label}
      renderOption={(props_ch, option, { selected }) => {
        return (
          <li {...props_ch}>
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.label}
          </li>
        );
      }}
      style={{ width: props.width ?? '100%' }}
      renderInput={(params) =>
        props.readOnly ? (
          <TextField
            {...params}
            label={props.label ?? ''}
            placeholder={props.placeholder ?? ''}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
            }}
          />
        ) : (
          <TextField
            {...params}
            label={props.label ?? ''}
            placeholder={props.placeholder ?? ''}
            variant="standard"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        )
      }
    />
  );
}
