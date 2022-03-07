import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TASK, EDITED_TASK, TASK_STATE } from '../types';
import useConcatUserName from '../../hooks/userName';

export const initialTask: TASK = {
  task_id: '',
  task_name: '',
  project_id: '',
  task_category_id: null,
  task_category_name: '',
  assigned_id: null,
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

export const initialEditedTask: EDITED_TASK = {
  task_name: '',
  project_id: '',
  task_category_id: null,
  assigned_id: null,
  author_id: null,
  status: 'Not started',
  description: '',
  estimate_manhour: null,
  actual_manhour: null,
  scheduled_startdate: '',
  scheduled_enddate: '',
  actual_startdate: null,
  actual_enddate: null,
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
  selectedTask: initialTask,
  editedTask: initialEditedTask,
};

// ユーザー名を作成
interface IUser {
  first_name: string;
  last_name: string;
}
const concatUserName = <T extends IUser>(user: T) => {
  return `${user?.last_name ?? ''} ${user?.first_name ?? ''}`;
};

// タスクの取得
export const fetchAsyncGetTasks = createAsyncThunk(
  'task/get',
  async (_, thunkAPI) => {
    const selectedProjectId = (thunkAPI.getState() as RootState).project
      .selectedProjectId;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/task/project/${selectedProjectId}`,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.localJWT}`,
        },
      }
    );

    const tasks = await res.data.map((task: any) => {
      const shapedTask = {
        ...task,
        assigned_name: concatUserName(task.assigned),
      };
      delete shapedTask.assigned;
      return shapedTask;
    });

    return tasks;
  }
);

// タスクの登録
export const fetchAsyncRegisterTask = createAsyncThunk(
  'task/register',
  async (_, thunkAPI) => {
    const editedTask = {
      ...(thunkAPI.getState() as RootState).task.editedTask,
    };
    console.log('addTask', editedTask.task_id);
    await console.log(editedTask);
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/task`,
      editedTask,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.localJWT}`,
        },
      }
    );

    const tasks = await res.data.map((task: any) => {
      const shapedTask = {
        ...task,
        assigned_name: concatUserName(task.assigned),
      };
      delete shapedTask.assigned;
      return shapedTask;
    });

    return tasks;
  }
);

// タスクの更新
export const fetchAsyncUpdateTask = createAsyncThunk(
  'task/update',
  async (_, thunkAPI) => {
    const editedTask = (thunkAPI.getState() as RootState).task.editedTask;
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/task/${editedTask.task_id}`,
      editedTask,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.localJWT}`,
        },
      }
    );

    const tasks = await res.data.map((task: any) => {
      const shapedTask = {
        ...task,
        assigned_name: concatUserName(task.assigned),
      };
      delete shapedTask.assigned;
      return shapedTask;
    });

    return tasks;
  }
);

// タスクの削除
export const fetchAsyncDeleteTask = createAsyncThunk(
  'task/delete',
  async (selectedTasks: TASK[], thunkAPI) => {
    const selectedProjectId = (thunkAPI.getState() as RootState).project
      .selectedProjectId;
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/task/project/${selectedProjectId}`,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.localJWT}`,
        },
        data: {
          task_id: selectedTasks.map((task) => task.task_id),
        },
      }
    );

    const tasks = await res.data.map((task: any) => {
      const shapedTask = {
        ...task,
        assigned_name: concatUserName(task.assigned),
      };
      delete shapedTask.assigned;
      return shapedTask;
    });

    return tasks;
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
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
    setSelectedTask(state, action) {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetTasks.fulfilled, (state, action) => {
      return { ...state, tasks: action.payload };
    });
    builder.addCase(fetchAsyncRegisterTask.fulfilled, (state, action) => {
      return { ...state, tasks: action.payload };
    });
    builder.addCase(fetchAsyncUpdateTask.fulfilled, (state, action) => {
      return { ...state, tasks: action.payload };
    });
    builder.addCase(fetchAsyncDeleteTask.fulfilled, (state, action) => {
      console.log('why?', action.payload);
      return { ...state, tasks: action.payload };
    });
  },
});

export const {
  setTasks,
  setTaskDialogOpen,
  setTaskDialogMode,
  setFilterTaskOpen,
  setFilterTask,
  setEditedTask,
  setSelectedTask,
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
export const selectSelectedTask = (state: RootState) => state.task.selectedTask;

export default taskSlice.reducer;
