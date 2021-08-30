import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import * as datehandler from "../../date/dateHandler";
import { CALENDAR } from "../types";

const initialState = (): CALENDAR => {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let firstDateOfMonth = datehandler.getFirstDateOfMonth(year, month);
  let lastDateOfMonth = datehandler.getLastDateOfMonth(year, month);
  let firstDateOfCalendar = datehandler.getFirstDateOfCalendar(year, month);
  let lastDateOfCalendar = datehandler.getlastDateOfCalendar(year, month);
  return {
    year: year,
    month: month,
    firstDateOfMonth: firstDateOfMonth,
    lastDateOfMonth: lastDateOfMonth,
    firstDateOfCalendar: firstDateOfCalendar,
    lastDateOfCalendar: lastDateOfCalendar,
  };
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: initialState(),
  reducers: {},
});

export const selectCalendar = (state: RootState) => state.calendar;

export default calendarSlice.reducer;
