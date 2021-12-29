import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CALENDAR_STATE } from '../types';
import { fillDigitsByZero } from '../../util/dateHandler';

const initialState: CALENDAR_STATE = {
  yearMonth: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    year_month: `${new Date().getFullYear()}-${fillDigitsByZero(
      new Date().getMonth() + 1,
      2
    )}`,
  },
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: initialState,
  reducers: {
    setYearMonth(state, action) {
      return { ...state, yearMonth: action.payload };
    },
  },
});

export const { setYearMonth } = calendarSlice.actions;

export const selectYearMonth = (state: RootState) => state.calendar.yearMonth;

export default calendarSlice.reducer;
