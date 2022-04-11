import React from 'react';
import { css } from '@emotion/react';
import TextField from '@mui/material/TextField';
import { TARGET } from '../features/types';

type Props = {
  id?: string;
  label?: string;
  type?: 'number';
  name: string;
  value: null | string | number;
  index?: number;
  onChange?: Function;
  width?: string;
  readOnly?: boolean;
  rows?: number;
  maxVal?: number;
  minVal?: number;
};

const CommonTextField: React.FC<Props> = (props) => {
  const widthStyle = css`
    ${'width' in props
      ? `width: ${props.width};`
      : 'type' in props && props.type === 'number'
      ? 'width: 98px;'
      : ''}
  `;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = event.target.value;

    if (props.type === 'number') {
      if (props.maxVal && props.maxVal < Number(val)) return;
      if (props.minVal && Number(val) < props.minVal) return;
    }

    let target: TARGET = {
      name: props.name,
      value:
        props.type === 'number' && val !== ''
          ? Number(val)
          : props.type === 'number'
          ? null
          : val,
    };
    if ('index' in props) {
      target.index = props.index;
    }
    props.onChange && props.onChange(target);
  };

  return (
    <TextField
      css={widthStyle}
      variant='standard'
      margin='normal'
      id={'id' in props ? props.id : undefined}
      label={'label' in props ? props.label : undefined}
      type={'type' in props ? props.type : undefined}
      name={props.name}
      value={props.value}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={(event) => handleInputChange(event)}
      InputProps={{
        readOnly: props.readOnly,
      }}
      multiline={'rows' in props ? true : false}
      rows={'rows' in props ? props.rows : 0}
    />
  );
};

export default CommonTextField;
