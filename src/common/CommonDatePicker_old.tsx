import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import jaLocale from "date-fns/locale/ja";
import format from "date-fns/format";
import { parseString } from "../date/dateHandler";
import { TARGET } from "../features/types";

class ExtendedUtils extends DateFnsUtils {
  getCalendarHeaderText(date: any) {
    return format(date, "yyyy年MM月", { locale: this.locale });
  }
  getDatePickerHeaderText(date: any) {
    return format(date, "MMMd日 EEEE", { locale: this.locale });
  }
}

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
      <MuiPickersUtilsProvider utils={ExtendedUtils} locale={jaLocale}>
        <KeyboardDatePicker
          autoOk
          disableToolbar
          variant='inline'
          // inputVariant='outlined'
          size='small'
          margin='normal'
          label={"label" in props ? props.label : "日付"}
          format='yyyy-MM-dd'
          clearable
          value={props.value ? Date.parse(props.value) : null}
          onChange={(date) => handleDateChange(date)}
          // KeyboardButtonProps={{
          //   "aria-label": "change date",
          // }}
          maxDateMessage='2100-01-01より前の日付を入力してください。'
          minDateMessage='1900-01-01より後の日付を入力してください。'
          invalidDateMessage='yyyy-MM-dd形式で入力してください。'
          // clearLabel='クリア'
          // okLabel='決定'
          // cancelLabel='キャンセル'
          InputLabelProps={{
            shrink: true,
          }}
        />
      </MuiPickersUtilsProvider>
    </>
  );
};

export default DatePickerDialog;
