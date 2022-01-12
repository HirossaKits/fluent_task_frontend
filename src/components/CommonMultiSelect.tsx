import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { TARGET } from '../features/types';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value: Option[];
  label?: string;
  placeholder?: string;
  width?: number;
  name: string;
  index?: number;
  onChange: Function;
  readOnly?: boolean;
};

export default function CommonMultiSelect(props: Props) {
  const handleSelectedChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: Option[]
  ) => {
    let target: TARGET = {
      name: props.name,
      value: value.map((option) => option.value),
    };
    props.onChange(target);
  };

  const test = (
    event: React.SyntheticEvent<Element, Event>,
    value: Option[]
  ) => {
    let target: TARGET = {
      name: props.name,
      value: value.map((option) => option.value),
    };
    props.onChange(target);
  };

  // attr
  // https://codesandbox.io/s/material-demo-kznv3?file=/demo.js:866-881-999

  return (
    <Autocomplete
      multiple
      options={props.options}
      // value={props.value}
      disableCloseOnSelect
      onChange={handleSelectedChange}
      // onChange={(event, value) => test(event, value)}
      getOptionLabel={(option) => option.label}
      renderOption={(option, state) => {
        const selected = props.value.findIndex((val) => val);
        return (
          <li {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
              checkedIcon={<CheckBoxIcon fontSize='small' />}
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
            variant='standard'
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
          />
        ) : (
          <TextField
            {...params}
            label={props.label ?? ''}
            placeholder={props.placeholder ?? ''}
            variant='standard'
            margin='normal'
          />
        )
      }
    />
  );
}
