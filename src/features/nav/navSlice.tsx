import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { NAV_STATE } from "../../types";

const initialState: NAV_STATE = {
  settingsMenuOpen: false,
  profileMenuOpen: false,
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
  },
});

export const { setSettingsMenuOpen, setProfileMenuOpen } = navSlice.actions;
export const selectSettingsMenuOpen = (state: RootState) =>
  state.nav.settingsMenuOpen;
export const selectProfileMenuOpen = (state: RootState) =>
  state.nav.profileMenuOpen;

export default navSlice.reducer;
