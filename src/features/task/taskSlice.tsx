import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TASK_STATE } from "../types";

// Demo
import { demoData } from "../../DummyData";

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
    id: "",
    projectId: "",
    assigned: "",
    author: "",
    title: "",
    category: "",
    description: "",
    status: "Not started",
    estimate_manhour: "0",
    actual_manhour: "0",
    scheduled_startdate: null,
    scheduled_enddate: null,
    actual_startdate: null,
    actual_enddate: null,



    estimate_manhour: string;
    actual_manhour: string;
    scheduled_startdate: string;
    scheduled_enddate: string;
    actual_startdate: string;
    actual_enddate: string;
    assigned: string;
    description: string;
    author: string;
    created_at?: string;
    update_at?: string;
  },
  selectedTask: {
    id: "",
    projectId: "",
    assigned: "",
    author: "",
    title: "",
    category: "",
    description: "",
    status: "",
    estimate_manhour: 0,
    actual_manhour: 0,
    scheduled_startdate: null,
    scheduled_enddate: null,
    actual_startdate: null,
    actual_enddate: null,
    created_at: "",
    update_at: "",
  },
};

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
