import React from 'react';
import { css } from '@emotion/react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { TARGET } from '../features/types';

type Option = {
  value: string | number;
  label: string | number;
};

type Props = {
  options: Option[] | undefined;
  label?: string;
  width?: string | number;
  name: string;
  value: null | string | number;
  index?: number;
  onChange: Function;
  readOnly?: boolean;
  clearable?: true;
};

const CommonSelect: React.FC<Props> = (props: Props) => {
  const handleSelectChange = (event: any, newItem: Option | null) => {
    let target: TARGET = {
      name: props.name,
      value: newItem ? newItem.value : null,
    };
    if ('index' in props) {
      target.index = props.index;
    }
    props.onChange(target);
  };

  const styles = {
    autoComp: css`
      ${'width' in props ? `width: ${props.width};` : 'width: 196px;'}
    `,
  };

  return (
    <>
      <Autocomplete
        css={styles.autoComp}
        disableClearable={'clearable' in props ? false : true}
        options={props.options ?? []}
        getOptionLabel={(option) => option.label.toString()}
        value={props.options?.find((opt) => opt.value === props.value) ?? null}
        onChange={(event, newItem) => handleSelectChange(event, newItem)}
        renderInput={(params) =>
          props.readOnly ? (
            <TextField
              {...params}
              variant="standard"
              margin="normal"
              label={'label' in props && props.label}
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
              autoComplete="off"
              variant="standard"
              margin="normal"
              label={'label' in props && props.label}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )
        }
      />
    </>
  );
};

export default CommonSelect;
