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
    status: "",
    estimate_manhour: 0,
    actual_manhour: 0,
    scheduled_startdate: null,
    scheduled_enddate: null,
    actual_startdate: null,
    actual_enddate: null,
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
