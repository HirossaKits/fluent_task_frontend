import React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={"label" in props ? props.label : "日付"}
          mask='____/__/__'
          value={props.value ? Date.parse(props.value) : null}
          onChange={(date) => handleDateChange(date)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};

export default DatePickerDialog;
