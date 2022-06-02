import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { EDITED_PROJECT, PROJECT, PROJECT_SATATE } from '../types';
import { isCompositeComponentWithType } from 'react-dom/test-utils';

export const emptyProject: PROJECT = {
  project_id: '',
  project_name: '',
  org_id: '',
  resp_id: [],
  member_id: [],
  resp: [],
  member: [],
  description: '',
  startdate: '',
  enddate: '',
};

export const emptyEditedProject: EDITED_PROJECT = {
  project_id: '',
  project_name: '',
  resp_id: [],
  member_id: [],
  description: '',
  startdate: '',
  enddate: '',
};

const initialState: PROJECT_SATATE = {
  projects: [],
  selectedProjectId: '',
  editedProject: emptyEditedProject,
  projectDialogOpen: false,
  projectDialogMode: 'register',
};

export const fetchAsyncGetProject = createAsyncThunk(
  'project/getProject',
  async (_, thunkAPI) => {
    const org_id = (thunkAPI.getState() as RootState).org.org_info.org_id;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/project/org/${org_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncRegisterProject = createAsyncThunk(
  'project/registerProject',
  async (_, thunkAPI) => {
    const editedProject = (thunkAPI.getState() as RootState).project
      .editedProject;
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/project`,
      editedProject,
      {
        headers: {
          Authorization: `Bearer ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncUpdateProject = createAsyncThunk(
  'project/updateProject',
  async (_, thunkAPI) => {
    const editedProject = (thunkAPI.getState() as RootState).project
      .editedProject;
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/project/${editedProject.project_id}`,
      editedProject,
      {
        headers: {
          Authorization: `Bearer ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncDeleteProject = createAsyncThunk(
  'project/deleteProject',
  async (_, thunkAPI) => {
    const projectId = (thunkAPI.getState() as RootState).project
      .selectedProjectId;
    const res = await axios.delete<PROJECT[]>(
      `${process.env.REACT_APP_API_URL}/project/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.localJWT}`,
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
    initProjectState(state, action) {
      return initialState;
    },
    setSelectedProjectId(state, action) {
      state.selectedProjectId = action.payload;
    },
    setEditedProject(state, action) {
      state.editedProject = action.payload;
    },
    setProject(state, action) {
      state.projects = state.projects.map((proj) => {
        if (proj.project_id === action.payload.project_id) {
          return action.payload;
        } else {
          return proj;
        }
      });
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
    setProjectDialogMode(state, action) {
      state.projectDialogMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetProject.fulfilled, (state, action) => {
      if (!action.payload.length) {
        // プロジェクトが存在しない場合は新規作成を選択状態とする。
        return {
          ...state,
          projects: action.payload,
          selectedProjectId: 'new_project',
        };
      } else if (
        // プロジェクト未選択の場合は、先頭のプロジェクトを選択状態とする。
        action.payload.length > 0 &&
        (!state.selectedProjectId ||
          !action.payload
            .map((proj: PROJECT) => proj.project_id)
            .includes(state.selectedProjectId))
      ) {
        return {
          ...state,
          projects: action.payload,
          selectedProjectId: action.payload[0].project_id,
        };
      } else {
        return {
          ...state,
          projects: action.payload,
        };
      }
    });
    builder.addCase(fetchAsyncRegisterProject.fulfilled, (state, action) => {
      return {
        ...state,
        projects: action.payload,
        selectedProjectId: action.payload[action.payload.length - 1].project_id,
      };
    });
    builder.addCase(fetchAsyncUpdateProject.fulfilled, (state, action) => {
      return {
        ...state,
        projects: action.payload,
      };
    });
    builder.addCase(
      fetchAsyncDeleteProject.fulfilled,
      (state, action: PayloadAction<PROJECT[]>) => {
        if (action.payload.length > 0) {
          return {
            ...state,
            projects: action.payload,
            selectedProjectId: action.payload[0].project_id,
          };
        } else {
          return {
            ...state,
            projects: action.payload,
            selectedProjectId: 'new_project',
          };
        }
      }
    );
  },
});

export const {
  initProjectState,
  setSelectedProjectId,
  setEditedProject,
  setProject,
  setTaskCategory,
  setProjectDialogOpen,
  setProjectDialogMode,
} = projectSlice.actions;

export const selectProjects = (state: RootState) => state.project.projects;
export const selectSelectedProject = (state: RootState) =>
  state.project.projects.find(
    (project) => project.project_id === state.project.selectedProjectId
  ) ?? emptyProject;
export const selectSelectedProjectId = (state: RootState) =>
  state.project.selectedProjectId;
export const selectSelectedProjectMember = (state: RootState) =>
  state.project.projects.find(
    (proj) => proj.project_id === state.project.selectedProjectId
  )?.member;
export const selectEditedProject = (state: RootState) =>
  state.project.editedProject;
export const selectProjectDialogOpen = (state: RootState) =>
  state.project.projectDialogOpen;
export const selectProjectDialogMode = (state: RootState) =>
  state.project.projectDialogMode;

export default projectSlice.reducer;
