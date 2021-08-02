import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { NAV_STATE } from "../types";

const initialState: NAV_STATE = {
  settingsOpen: false,
  settingsAnchorEl: null,
  profileOpen: false,
  profileAnchorEl: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setSettingsOpen(state, action) {
      state.settingsOpen = action.payload;
    },
    setSettingsAnchorEl(state, action) {
      state.settingsAnchorEl = action.payload;
    },
    setProfileOpenm(state, action) {
      state.profileOpen = action.payload;
    },
    setProfileAnchorEl(state, action) {
      state.settingsAnchorEl = action.payload;
    },
  },
});

export const {
  setSettingsOpen,
  setSettingsAnchorEl,
  setProfileOpenm,
  setProfileAnchorEl,
} = navSlice.actions;
export const selectSettingsOpen = (state: RootState) => state.nav.settingsOpen;
export const selectSettingsAnchorEl = (state: RootState) =>
  state.nav.settingsAnchorEl;
export const selectProfileOpen = (state: RootState) => state.nav.profileOpen;
export const selectpPofileAnchorEl = (state: RootState) =>
  state.nav.profileAnchorEl;

export default navSlice.reducer;
