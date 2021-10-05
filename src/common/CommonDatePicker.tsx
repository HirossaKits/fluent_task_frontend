import React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import jaLocale from "date-fns/locale/ja";
import enLocale from "date-fns/locale/en-US";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import DatePicker from "@mui/lab/DatePicker";
import { parseString } from "../date/dateHandler";
import { TARGET } from "../features/types";

type Props = {
  id?: string;
  label?: string;
  name: string;
  value: null | string;
  onChange: Function;
  index?: number;
};

const DatePickerDialog: React.FC<Props> = (props) => {
  const handleDateChange = (date: any) => {
    alert(date);
    let target: TARGET = {
      name: props.name,
      value: parseString(date),
    };
    if ("index" in props) {
      target.index = props.index;
    }
    console.log(target);
    props.onChange(target);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
        <DatePicker
          mask='____-__-__'
          inputFormat='yyyy-MM-dd'
          // value={props.value ? Date.parse(props.value) : null}
          value={new Date()}
          onChange={(date) => handleDateChange(date)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='standard'
              label={"label" in props && props.label}
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
