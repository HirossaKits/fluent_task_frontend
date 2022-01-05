import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { PROJECT, PROJECT_SATATE } from '../types';
import { Category } from '../../selectionOptions';
import { demoProjects } from '../../DummyData';

const initialState: PROJECT_SATATE = {
  projects: demoProjects,
  selectedProjectId: demoProjects[0].project_id,
  editedProject: {
    project_id: '',
    project_name: '',
    org_id: '',
    resp_id: [''],
    member_id: [''],
    task_category: [],
    description: '',
    startdate: '',
    enddate: '',
  },
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
    setSelectedProjectId(state, action) {
      state.selectedProjectId = action.payload;
    },
    setEditedProject(state, action) {
      state.editedProject = action.payload;
    },
    setTaskCategory(state, action) {
      const newProjects = state.projects.map((project) => {
        if (project.project_id === state.selectedProjectId) return project;
        return { ...project, task_category: action.payload };
      });
      return {
        ...state,
        projects: newProjects,
      };
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

export const {
  setSelectedProjectId,
  setEditedProject,
  setTaskCategory,
  setProjectDialogOpen,
} = projectSlice.actions;

export const selectProjects = (state: RootState) => state.project.projects;
export const selectSelectedProjectId = (state: RootState) =>
  state.project.selectedProjectId;
export const selectEditedProject = (state: RootState) =>
  state.project.editedProject;

export const selectSelectedProject = (state: RootState) =>
  state.project.projects.find(
    (project) => project.project_id === state.project.selectedProjectId
  );
export const selectProjectMemberId = (state: RootState) =>
  state.project.projects.find(
    (project) => project.project_id === state.project.selectedProjectId
  )?.member_id;
export const selectTaskCategory = (state: RootState) =>
  state.project.projects.find(
    (project) => project.project_id === state.project.selectedProjectId
  )?.task_category;

export const selectProjectDialogOpen = (state: RootState) =>
  state.project.projectDialogOpen;

export default projectSlice.reducer;
