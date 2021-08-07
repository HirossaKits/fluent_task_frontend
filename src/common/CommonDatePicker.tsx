import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import jaLocale from "date-fns/locale/ja";
import format from "date-fns/format";
import { TARGET } from "../types";

class ExtendedUtils extends DateFnsUtils {
  getCalendarHeaderText(date: any) {
    return format(date, "yyyy年MM月", { locale: this.locale });
  }
  getDatePickerHeaderText(date: any) {
    return format(date, "MMMd日 EEEE", { locale: this.locale });
  }
}

const useStyles = makeStyles((theme) => ({
  standard: {
    width: "30ch",
  },
}));

type Props = {
  id?: string;
  label?: string;
  name: string;
  value: Date | null;
  onChange: Function;
};

const DatePickerDialog: React.FC<Props> = (props) => {
  const classes = useStyles();

  const handleDateChange = (date: any) => {
    let target: TARGET = {
      name: props.name,
      value: date,
    };
    props.onChange(target);
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={ExtendedUtils} locale={jaLocale}>
        <KeyboardDatePicker
          className={classes.standard}
          // autoOk
          // variant='inline'
          margin='dense'
          label={"label" in props ? props.label : "日付"}
          format='yyyy-MM-dd'
          // clearable
          value={props.value}
          onChange={(date) => handleDateChange(date)}
          // KeyboardButtonProps={{
          //   "aria-label": "change date",
          // }}
          disablePast
          maxDateMessage='2100-01-01より前の日付を入力してください。'
          minDateMessage='1900-01-01より後の日付を入力してください。'
          invalidDateMessage='日付の入力値が不正です。'
          // clearLabel='クリア'
          // okLabel='決定'
          // cancelLabel='キャンセル'
          // InputLabelProps={{
          //   shrink: true,
          // }}
        />
      </MuiPickersUtilsProvider>
    </>
  );
};

export default DatePickerDialog;
