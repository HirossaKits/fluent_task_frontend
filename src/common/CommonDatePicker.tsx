import React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import jaLocale from "date-fns/locale/ja";
import enLocale from "date-fns/locale/en-US";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import DatePicker from "@mui/lab/DatePicker";
import { parseString, parseDate } from "../date/dateHandler";
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
    if (props.value) {
      console.log(new Date(props.value));
      console.log(parseDate(props.value));
    }

    let target: TARGET = {
      name: props.name,
      value: parseString(date),
    };
    if ("index" in props) {
      target.index = props.index;
    }

    console.log(props);
    props.onChange(target);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          // mask='__-__-____'
          inputFormat='yyyy-MM-dd'
          value={props.value ? parseDate(props.value) : null}
          // value={new Date()}
          onChange={(date) => handleDateChange(date)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='standard'
              margin='normal'
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
