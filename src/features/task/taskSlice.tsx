import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TASK, EDITED_TASK, TASK_STATE } from '../types';
import { getTodayString } from '../../util/dateHandler';

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

export const initialEditedTask: TASK = {
  task_id: '',
  task_name: '',
  project_id: '',
  task_category_id: null,
  assigned_id: null,
  author_id: null,
  status: 'Not started',
  description: '',
  estimate_manhour: null,
  actual_manhour: null,
  scheduled_startdate: getTodayString(),
  scheduled_enddate: getTodayString(),
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
      operator: 'start_from',
      value: '',
    },
  ],
  // selectedTask: initialTask,
  editedTask: initialEditedTask,
  taskCategory: [],
};

// ユーザー名を作成
interface IUser {
  first_name: string;
  last_name: string;
}
const concatUserName = <T extends IUser>(user: T) => {
  return `${user?.last_name ?? ''} ${user?.first_name ?? ''}`;
};

// 編集タスクデータを整形
const shapeTask = (task: TASK, mode: 'register' | 'update'): EDITED_TASK => {
  if (mode === 'register') {
    return {
      task_name: task.task_name,
      project_id: task.project_id,
      task_category_id: task.task_category_id,
      assigned_id: task.assigned_id,
      author_id: task.author_id,
      status: task.status,
      description: task.description,
      estimate_manhour: task.estimate_manhour,
      actual_manhour: task.actual_manhour,
      scheduled_startdate: task.scheduled_startdate,
      scheduled_enddate: task.scheduled_enddate,
      actual_startdate: task.actual_startdate,
      actual_enddate: task.actual_enddate,
    };
  } else {
    return {
      task_id: task.task_id,
      task_name: task.task_name,
      project_id: task.project_id,
      task_category_id: task.task_category_id,
      assigned_id: task.assigned_id,
      author_id: task.author_id,
      status: task.status,
      description: task.description,
      estimate_manhour: task.estimate_manhour,
      actual_manhour: task.actual_manhour,
      scheduled_startdate: task.scheduled_startdate,
      scheduled_enddate: task.scheduled_enddate,
      actual_startdate: task.actual_startdate,
      actual_enddate: task.actual_enddate,
    };
  }
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

    const data = shapeTask(editedTask, 'register');
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/task`,
      data,
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
    const data = shapeTask(editedTask, 'update');
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/task/${editedTask.task_id}`,
      data,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.localJWT}`,
        },
      }
    );

    console.log(res);
    const tasks = await res.data.map((task: any) => {
      const shapedTask = {
        ...task,
        assigned_name: concatUserName(task.assigned),
      };
      delete shapedTask.assigned;
      return shapedTask;
    });
    console.log(tasks);
    return tasks;
  }
);

// カンバン移動時のタスク更新
export const fetchAsyncUpdateTaskStatus = createAsyncThunk(
  'task/status/update',
  async (
    data: {
      task_id: string;
      status: string;
      actual_startdate: string;
      actual_enddate: string;
    },
    thunkAPI
  ) => {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/task/${data.task_id}`,
      {
        status: data.status,
        actual_startdate: data.actual_startdate,
        actual_enddate: data.actual_enddate,
      },
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

    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(1000);

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

// タスクカテゴリーの取得
export const fetchAsyncGetTaskCategory = createAsyncThunk(
  'taskcategory/get',
  async (_, thunkAPI) => {
    const selectedProjectId = (thunkAPI.getState() as RootState).project
      .selectedProjectId;
    console.log('testes', selectedProjectId);
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/taskcategory/project/${selectedProjectId}`,
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

// タスクカテゴリーの登録
export const fetchAsyncRegisterTaskCategory = createAsyncThunk(
  'taskcategory/register',
  async (data: { task_category_name: string; project_id: string }) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/taskcategory`,
      data,
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

// タスクカテゴリーの更新
export const fetchAsyncUpdateTaskCategory = createAsyncThunk(
  'taskcategory/update',
  async (data: { task_category_id: string; task_category_name: string }) => {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/taskcategory/${data.task_category_id}`,
      { task_category_name: data.task_category_name },
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

// タスクカテゴリーの削除
export const fetchAsyncDeleteTaskCategory = createAsyncThunk(
  'taskcategory/delete',
  async (task_category_id: string) => {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/taskcategory/${task_category_id}`,
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
    // setSelectedTask(state, action) {
    //   state.selectedTask = action.payload;
    // },
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
    builder.addCase(fetchAsyncUpdateTaskStatus.fulfilled, (state, action) => {
      return { ...state, tasks: action.payload };
    });
    builder.addCase(fetchAsyncDeleteTask.fulfilled, (state, action) => {
      return { ...state, tasks: action.payload };
    });
    builder.addCase(fetchAsyncGetTaskCategory.fulfilled, (state, action) => {
      return { ...state, taskCategory: action.payload };
    });
    builder.addCase(
      fetchAsyncRegisterTaskCategory.fulfilled,
      (state, action) => {
        return { ...state, taskCategory: action.payload };
      }
    );
    builder.addCase(fetchAsyncUpdateTaskCategory.fulfilled, (state, action) => {
      return { ...state, taskCategory: action.payload };
    });
    builder.addCase(fetchAsyncDeleteTaskCategory.fulfilled, (state, action) => {
      return { ...state, taskCategory: action.payload };
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
  // setSelectedTask,
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
// export const selectSelectedTask = (state: RootState) => state.task.selectedTask;
export const selectTaskCategory = (state: RootState) => state.task.taskCategory;

export default taskSlice.reducer;
