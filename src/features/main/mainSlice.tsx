import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { MAIN_STATE } from "../types";

const initialState: MAIN_STATE = {
  mainComponentName: "List",
  settingsMenuOpen: false,
  profileMenuOpen: false,
  profileDialogOpen: false,
  settings: {
    dark_mode: false,
    view_only_owned: false,
    selected_project: "",
  },
  profile: {
    avatar_img: "",
    description: "",
  },
};

export const fetchAsyncGetLoginUserProfile = createAsyncThunk(
  "main/getetLoginUserProfile",
  async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user/profile/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setMainComponentName(state, action) {
      state.mainComponentName = action.payload;
    },
    setSettingsMenuOpen(state, action) {
      state.settingsMenuOpen = action.payload;
    },
    setProfileMenuOpen(state, action) {
      state.profileMenuOpen = action.payload;
    },
    setProfileDialogOpen(state, action) {
      state.profileDialogOpen = action.payload;
    },
    setSettings(state, action) {
      state.settings = action.payload;
    },
    setProfile(state, action) {
      state.settings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetLoginUserProfile.fulfilled,
      (state, action) => {
        state.profile = action.payload;
      }
    );
  },
});

export const {
  setMainComponentName,
  setSettingsMenuOpen,
  setProfileMenuOpen,
  setProfileDialogOpen,
  setSettings,
  setProfile,
} = mainSlice.actions;
export const selectMainComponentName = (state: RootState) =>
  state.main.mainComponentName;
export const selectSettingsMenuOpen = (state: RootState) =>
  state.main.settingsMenuOpen;
export const selectProfileMenuOpen = (state: RootState) =>
  state.main.profileMenuOpen;
export const selectProfileDialogOpen = (state: RootState) =>
  state.main.profileDialogOpen;
export const selectSettings = (state: RootState) => state.main.settings;
export const selectProfile = (state: RootState) => state.main.profile;

export default mainSlice.reducer;
