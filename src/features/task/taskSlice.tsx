import axios from 'axios';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TASK, EDITED_TASK, TASK_STATE } from '../types';
import { JWT } from '../types';

export const initialTask: TASK = {
  task_id: '',
  task_name: '',
  project_id: '',
  category_id: '',
  category_name: '',
  assigned_id: '',
  assigned_name: '',
  author_id: '',
  author_name: '',
  status: 'Not started',
  description: '',
  estimate_manhour: null,
  actual_manhour: null,
  scheduled_startdate: '',
  scheduled_enddate: '',
  actual_startdate: null,
  actual_enddate: null,
  created_at: null,
  update_at: null,
};

export const emptyEditedTask: EDITED_TASK = {
  task_name: '',
  project_id: '',
  category_id: '',
  assigned_id: '',
  author_id: '',
  status: 'Not started',
  description: '',
  estimate_manhour: null,
  actual_manhour: null,
  scheduled_startdate: '',
  scheduled_enddate: '',
  actual_startdate: null,
  actual_enddate: null,
  created_at: null,
  update_at: null,
};

const initialState: TASK_STATE = {
  tasks: [],
  taskDialogOpen: false,
  taskDialogMode: 'edit',
  filterTaskOpen: false,
  filterTask: [
    {
      columnName: 'task_name',
      type: 'string',
      operator: '=',
      value: '',
    },
  ],
  editedTask: emptyEditedTask,
};

// タスクの登録
export const fetchAsyncRegisterTask = createAsyncThunk(
  'task/register',
  async (_, thunkAPI) => {
    const editedTask = (thunkAPI.getState() as RootState).task.editedTask;
    const res = await axios.post<JWT>(
      `${process.env.REACT_APP_API_URL}/api/task`,
      editedTask,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {
    setTaskDialogOpen(state, action) {
      state.taskDialogOpen = action.payload;
    },
    setTaskDialogMode(state, action) {
      state.taskDialogMode = action.payload;
    },
    setFilterTaskOpen(state, action) {
      state.filterTaskOpen = action.payload;
    },
    setFilterTask(state, action) {
      state.filterTask = action.payload;
    },
    setEditedTask(state, action) {
      state.editedTask = action.payload;
    },
    setTasks(state, action) {
      state.tasks = action.payload;
    },
  },
});

export const {
  setTaskDialogOpen,
  setTaskDialogMode,
  setFilterTaskOpen,
  setFilterTask,
  setEditedTask,
  setTasks,
} = taskSlice.actions;

export const selectTasks = (state: RootState) => state.task.tasks;
export const selectTaskDialogOpen = (state: RootState) =>
  state.task.taskDialogOpen;
export const selectTaskDialogMode = (state: RootState) =>
  state.task.taskDialogMode;
export const selectFilterTaskOpen = (state: RootState) =>
  state.task.filterTaskOpen;
export const selectFilterTask = (state: RootState) => state.task.filterTask;
export const selectEditedTask = (state: RootState) => state.task.editedTask;

export default taskSlice.reducer;
