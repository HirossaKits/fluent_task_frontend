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
};

export default function CommonMultiSelect(props: Props) {
  const handleSelectedChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: Option[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<Option>
  ) => {
    let target: TARGET = {
      name: props.name,
      value: value.map((option) => option.value),
    };
    props.onChange(target);
  };

  return (
    <Autocomplete
      multiple
      options={props.options}
      value={props.value}
      disableCloseOnSelect
      onChange={handleSelectedChange}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
            checkedIcon={<CheckBoxIcon fontSize='small' />}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </li>
      )}
      style={{ width: props.width ?? '100%' }}
      renderInput={(params) => (
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
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { value: '1994 ', label: 'The Shawshank Redemption' },
  { value: '1972 ', label: 'The Godfather' },
  { value: '1974 ', label: 'The Godfather: Part II' },
  { value: '2008 ', label: 'The Dark Knight' },
  { value: '1957 ', label: '12 Angry Men' },
  { value: '1993 ', label: "Schindler's List" },
  { value: '1994 ', label: 'Pulp Fiction' },
  { value: '1966 ', label: 'The Good' },
  { value: '1999 ', label: 'Fight Club' },
  { value: '1994 ', label: 'Forrest Gump' },
  { value: '2010 ', label: 'Inception' },
  { value: '1975 ', label: "One Flew Over the Cuckoo's Nest" },
  { value: '1990 ', label: 'Goodfellas' },
  { value: '1999 ', label: 'The Matrix' },
  { value: '1954 ', label: 'Seven Samurai' },
  { value: '2002 ', label: 'City of God' },
  { value: '1995 ', label: 'Se7en' },
  { value: '1991 ', label: 'The Silence of the Lambs' },
  { value: '1946 ', label: "It's a Wonderful Life" },
  { value: '1997 ', label: 'Life Is Beautiful' },
  { value: '1995 ', label: 'The Usual Suspects' },
  { value: '1994 ', label: 'Léon: The Professional' },
  { value: '2001 ', label: 'Spirited Away' },
  { value: '1998 ', label: 'Saving Private Ryan' },
  { value: '1968 ', label: 'Once Upon a Time in the West' },
  { value: '1998 ', label: 'American History X' },
  { value: '2014 ', label: 'Interstellar' },
];
