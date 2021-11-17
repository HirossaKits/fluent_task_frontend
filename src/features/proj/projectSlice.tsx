import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

const initialState = {
  projects: [
    {
      project_id: "",
      project_name: "",
      org_id: "",
      resp_id: [""],
      member_id: [""],
      description: "",
      startdate: "",
      enddate: "",
    },
  ],
  selectProjects: "",
};

export const fetchAsyncGetProject = createAsyncThunk(
  "project/getProject",
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
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetProject.fulfilled, (state, action) => {
      return {
        ...state,
        projects: action.payload,
      };
    });
  },
});

export const selectProjects = (state: RootState) => state.project.projects;

export default projectSlice.reducer;
