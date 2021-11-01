import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TASK_STATE } from "../types";
import { JWT } from "../types";

// Demo
import { demoData } from "../../DummyData";
import axios from "axios";

const initialState: TASK_STATE = {
  tasks: demoData,
  editTaskOpen: false,
  filterTaskOpen: false,
  filterTask: [
    {
      columnName: "task_name",
      type: "string",
      operator: "=",
      value: "",
    },
  ],
  editedTask: {
    task_id: "",
    task_name: "",
    project_id: "",
    project_name: "",
    category_id: "",
    category_name: "",
    assigned_id: "",
    assigned_name: "",
    author_id: "",
    author_name: "",
    status: "Not started",
    description: "",
    estimate_manhour: null,
    actual_manhour: null,
    scheduled_startdate: "",
    scheduled_enddate: "",
    actual_startdate: null,
    actual_enddate: null,
  },
  selectedTask: {
    task_id: "",
    task_name: "",
    project_id: "",
    project_name: "",
    category_id: "",
    category_name: "",
    assigned_id: "",
    assigned_name: "",
    author_id: "",
    author_name: "",
    status: "Not started",
    description: "",
    estimate_manhour: null,
    actual_manhour: null,
    scheduled_startdate: "",
    scheduled_enddate: "",
    actual_startdate: null,
    actual_enddate: null,
  },
};

// タスクの登録
export const fetchAsyncRegister = createAsyncThunk(
  "task/register",
  async (editedTask) => {
    const res = await axios.post<JWT>(
      `${process.env.REACT_APP_API_URL}/api/task/create/`,
      editedTask,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    setEditTaskOpen(state, action) {
      state.editTaskOpen = action.payload;
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
    // initEditedTask(state, action) {
    //   if (state.selectedTask.id !== "") {
    //     state.editedTask = {
    //       ...initialState.selectedTask,
    //     };
    //   }
    // },
  },
});

export const {
  setEditTaskOpen,
  setFilterTaskOpen,
  setFilterTask,
  setEditedTask,
} = taskSlice.actions;

export const selectTasks = (state: RootState) => state.task.tasks;
export const selectEditTaskOpen = (state: RootState) => state.task.editTaskOpen;
export const selectFilterTaskOpen = (state: RootState) =>
  state.task.filterTaskOpen;
export const selectFilterTask = (state: RootState) => state.task.filterTask;
export const selectEditedTask = (state: RootState) => state.task.editedTask;

export default taskSlice.reducer;
