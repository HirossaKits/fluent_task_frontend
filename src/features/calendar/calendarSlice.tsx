import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import {
  getFirstDateOfMonth,
  getLastDateOfMonth,
  getFirstDateOfCalendar,
  getLastDateOfCalendar,
  parseString,
} from "../../date/dateHandler";
import { CALENDAR, DATE_CONTEXT } from "../types";

const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth() + 1;

const createDates = (year: number, month: number): DATE_CONTEXT[] => {
  let day = getFirstDateOfMonth(year, month).getDay();

  let dates: DATE_CONTEXT[] = [];

  for (let i = 0; i < 35; i++) {
    let dt = new Date(year, month - 1, i - day + 1);
    let dc: DATE_CONTEXT = {
      index: i,
      dateStr: parseString(dt),
      year: dt.getFullYear(),
      month: dt.getMonth() + 1,
      date: dt.getDate(),
      isToday: dt.valueOf() === today.valueOf(),
    };
    dates.push(dc);
  }
  return dates;
};

const initialState: CALENDAR = {
  year: thisYear,
  month: thisMonth,
  firstDateOfMonth: getFirstDateOfMonth(thisYear, thisMonth),
  lastDateOfMonth: getLastDateOfMonth(thisYear, thisMonth),
  firstDateOfCalendar: getFirstDateOfCalendar(thisYear, thisMonth),
  lastDateOfCalendar: getLastDateOfCalendar(thisYear, thisMonth),
  dates: createDates(thisYear, thisMonth),
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: initialState,
  reducers: {
    setCalendar(state, action) {
      state = action.payload;
    },
  },
});

export const { setCalendar } = calendarSlice.actions;

export const selectCalendar = (state: RootState) => state.calendar;

export default calendarSlice.reducer;
