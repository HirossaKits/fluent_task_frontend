import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { MAIN_STATE } from '../types';

const initialState: MAIN_STATE = {
  mainComponentName: 'Proj',
  settingsMenuOpen: false,
  profileMenuOpen: false,
  profileDialogOpen: false,
  notificationDialogOpen: false,
  notificationCount: 0,
  messageOpen: false,
  message: '',
};

export const mainSlice = createSlice({
  name: 'main',
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
    setNotificationDialogOpen(state, action) {
      state.notificationDialogOpen = action.payload;
    },
    setNotificationCount(state, action) {
      state.notificationCount = action.payload;
    },
    setMessageOpen(state, action) {
      state.messageOpen = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
  },
});

export const {
  setMainComponentName,
  setNotificationDialogOpen,
  setSettingsMenuOpen,
  setProfileMenuOpen,
  setProfileDialogOpen,
  setMessageOpen,
  setMessage,
  setNotificationCount,
} = mainSlice.actions;
export const selectMainComponentName = (state: RootState) =>
  state.main.mainComponentName;
export const selectSettingsMenuOpen = (state: RootState) =>
  state.main.settingsMenuOpen;
export const selectProfileMenuOpen = (state: RootState) =>
  state.main.profileMenuOpen;
export const selectProfileDialogOpen = (state: RootState) =>
  state.main.profileDialogOpen;
export const selectMessageOpen = (state: RootState) => state.main.messageOpen;
export const selectMessage = (state: RootState) => state.main.message;
export const selectNotificationDialogOpen = (state: RootState) =>
  state.main.notificationDialogOpen;
export const selectNotificationCount = (state: RootState) =>
  state.main.notificationCount;

export default mainSlice.reducer;
