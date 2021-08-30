import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";
import navReducer from "../features/nav/navSlice";
import taskReducer from "../features/task/taskSlice";
import calendarReducer from "../features/calendar/calendarSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    nav: navReducer,
    task: taskReducer,
    calendar: calendarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
