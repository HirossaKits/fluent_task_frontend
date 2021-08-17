import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { NAV_STATE } from "../types";

const initialState: NAV_STATE = {
  displaiedComponent: "Calendar",
  settingsMenuOpen: false,
  profileMenuOpen: false,
  settings: {
    dark_mode: true,
    view_only_owned: false,
    selected_project: "",
  },
  profile: {
    avatar_img: "",
    description: "",
  },
};

export const fetchAsyncGetLoginUserProfile = createAsyncThunk(
  "nav/getetLoginUserProfile",
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

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setSettingsMenuOpen(state, action) {
      state.settingsMenuOpen = action.payload;
    },
    setProfileMenuOpen(state, action) {
      state.profileMenuOpen = action.payload;
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
  setSettingsMenuOpen,
  setProfileMenuOpen,
  setSettings,
  setProfile,
} = navSlice.actions;
export const selectDisplaiedComponent = (state: RootState) =>
  state.nav.displaiedComponent;
export const selectSettingsMenuOpen = (state: RootState) =>
  state.nav.settingsMenuOpen;
export const selectProfileMenuOpen = (state: RootState) =>
  state.nav.profileMenuOpen;
export const selectSettings = (state: RootState) => state.nav.settings;
export const selectProfile = (state: RootState) => state.nav.profile;

export default navSlice.reducer;
