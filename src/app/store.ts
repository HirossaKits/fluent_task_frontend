import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import mainReducer from '../features/main/mainSlice';
import taskReducer from '../features/task/taskSlice';
import calendarReducer from '../features/calendar/calendarSlice';
import projectReducer from '../features/proj/projectSlice';
import kanbanReducer from '../features/kanban/kanbanSlice';
import orgReducer from '../features/org/orgSliece';

export let store = configureStore({
  reducer: {
    auth: authReducer,
    main: mainReducer,
    org: orgReducer,
    project: projectReducer,
    task: taskReducer,
    calendar: calendarReducer,
    kanban: kanbanReducer,
  },
});

export const initStore = () => {
  store = configureStore({
    reducer: {
      auth: authReducer,
      main: mainReducer,
      org: orgReducer,
      project: projectReducer,
      task: taskReducer,
      calendar: calendarReducer,
      kanban: kanbanReducer,
    },
  });
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
