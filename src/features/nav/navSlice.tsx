import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { NAV_STATE } from "../../types";

const initialState: NAV_STATE = {
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
  },
});

export const { setSettingsMenuOpen, setProfileMenuOpen, setSettings } =
  navSlice.actions;
export const selectSettingsMenuOpen = (state: RootState) =>
  state.nav.settingsMenuOpen;
export const selectProfileMenuOpen = (state: RootState) =>
  state.nav.profileMenuOpen;
export const selectSettings = (state: RootState) => state.nav.settings;
export const selectProfile = (state: RootState) => state.nav.profile;

export default navSlice.reducer;
