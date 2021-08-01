import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = {
  settingsOpen: false,
  settingsAnchorEl: null,
  profileOpen: false,
  profileAnchorEl: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setSettingsOpen(state) {
      state.settingsOpen = true;
    },
    setSettingsAnchorEl(state, action) {
      state.settingsAnchorEl = action.payload;
    },
    setProfileOpenm(state) {
      state.profileOpen = true;
    },
    setProfileAnchorEl(state, action) {
      state.settingsAnchorEl = action.payload;
    },
  },
});

export const setSettingsOpen = navSlice.actions.setSettingsOpen;
export const setSettingsAnchorEl = navSlice.actions.setSettingsAnchorEl;
export const setProfileOpenm = navSlice.actions.setProfileOpenm;
export const setProfileAnchorEl = navSlice.actions.setProfileAnchorEl;

export const selectOpen = (state: RootState) => state.nav.settingsOpen;
export const selectProfileOpen = (state: RootState) => state.nav.profileOpen;

export default navSlice.reducer;
