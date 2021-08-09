import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { EDITED_TASK, TASK_STATE } from "../../types";

const initialState: TASK_STATE = {
  editedTask: {
    id: "",
    projectId: "",
    assigned: "",
    author: "",
    title: "",
    category: "",
    description: "",
    status: "Not started",
    estimate_manhour: 0,
    actual_manhour: 0,
    scheduled_start_date: null,
    scheduled_end_date: null,
    actual_start_date: null,
    actual_end_date: null,
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
    scheduled_start_date: null,
    scheduled_end_date: null,
    actual_start_date: null,
    actual_end_date: null,
    created_at: "",
    update_at: "",
  },
};

export const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    initEditedTask(state, action) {
      if (state.selectedTask.id !== "") {
        // state.editedTask = {
        //   ...initialState.selectedTask,
        // };
      }
    },
    setEditedTask(state, action) {
      state.editedTask = action.payload;
    },
  },
});

export const { setEditedTask } = taskSlice.actions;

export const selectEditedTask = (state: RootState) => state.task.editedTask;

export default taskSlice.reducer;
