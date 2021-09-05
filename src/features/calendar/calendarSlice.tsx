import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CALENDAR } from "../types";

const initialState: CALENDAR = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: initialState,
  reducers: {
    setCalendar(state, action) {
      return action.payload;
    },
  },
});

export const { setCalendar } = calendarSlice.actions;

export const selectCalendar = (state: RootState) => state.calendar;

export default calendarSlice.reducer;
