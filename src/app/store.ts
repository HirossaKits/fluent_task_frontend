import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";
import mainReducer from "../features/main/mainSlice";
import taskReducer from "../features/task/taskSlice";
import calendarReducer from "../features/calendar/calendarSlice";
import projectReducer from "../features/proj/projectSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    main: mainReducer,
    project: projectReducer,
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