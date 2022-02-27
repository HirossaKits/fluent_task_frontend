import React from 'react';
import { css } from '@emotion/react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import jaLocale from 'date-fns/locale/ja';
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DatePicker from '@mui/lab/DatePicker';
import { parseString, parseDate } from '../util/dateHandler';
import { TARGET } from '../features/types';

type Props = {
  id?: string;
  label?: string;
  name: string;
  value: null | string;
  onChange: Function;
  index?: number;
  width?: string | number;
  readOnly?: boolean;
};

const DatePickerDialog: React.FC<Props> = (props) => {
  const widthStyles = css`
    ${props.width ? `width: ${props.width}` : 'width: 125px;'}
  `;

  const handleDateChange = (date: any) => {
    let target: TARGET = {
      name: props.name,
      value: parseString(date),
    };
    if ('index' in props) {
      target.index = props.index;
    }

    props.onChange(target);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
        <DatePicker
          mask="____-__-__"
          inputFormat="yyyy-MM-dd"
          value={props.value ? parseDate(props.value) : null}
          readOnly={props.readOnly}
          onChange={(date) => handleDateChange(date)}
          renderInput={(params) => (
            <TextField
              {...params}
              css={widthStyles}
              variant="standard"
              margin="normal"
              label={'label' in props && props.label}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
};

export default DatePickerDialog;
