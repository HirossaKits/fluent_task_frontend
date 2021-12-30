import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { PROJECT, PROJECT_SATATE } from '../types';
import { Category } from '../../selectionOptions';
import { demoProjects } from '../../DummyData';

const blankProject: PROJECT = {
  project_id: '',
  project_name: '',
  org_id: '',
  resp_id: [''],
  member_id: [''],
  task_category: [''],
  description: '',
  startdate: '',
  enddate: '',
};

const initialState: PROJECT_SATATE = {
  projects: demoProjects,
  selectedProjectId: 'project_A',
  editedProject: blankProject,
  projectDialogOpen: false,
};

export const fetchAsyncGetProject = createAsyncThunk(
  'project/getProject',
  async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/project/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setTaskCategory(state, action) {
      state.selectedProjectId.taskCategory = action.payload;
    },
    setProjectDialogOpen(state, action) {
      state.projectDialogOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetProject.fulfilled, (state, action) => {
      return {
        ...state,
        projects: action.payload,
      };
    });
  },
});

export const { setProjectDialogOpen } = projectSlice.actions;

export const selectProjects = (state: RootState) => state.project.projects;
export const selectTaskCategory = (state: RootState) =>
  state.project.taskCategory;
export const selectProjectDialogOpen = (state: RootState) =>
  state.project.projectDialogOpen;

export default projectSlice.reducer;
