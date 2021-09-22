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
    task_id: "",
    task_name: "",
    project_id: "",
    // project_name: "",
    category_id: "",
    status: "Not started",
    description: "",
    estimate_manhour: null,
    actual_manhour: null,
    scheduled_startdate: "",
    scheduled_enddate: "",
    actual_startdate: null,
    actual_enddate: null,
    assigned_id: "",
    // assigned_name: "",
    author_id: "",
    // author_name: "",
  },
  selectedTask: {
    task_id: "",
    task_name: "",
    project_id: "",
    // project_name: "",
    category_id: "",
    status: "Not started",
    description: "",
    estimate_manhour: null,
    actual_manhour: null,
    scheduled_startdate: "",
    scheduled_enddate: "",
    actual_startdate: null,
    actual_enddate: null,
    assigned_id: "",
    // assigned_name: "",
    author_id: "",
    // author_name: "",
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
