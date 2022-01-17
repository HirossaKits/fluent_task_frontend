import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ORG_STATE } from '../types';

// remove later
import { dummyOrg } from '../../DummyData';

const initialState: ORG_STATE = {
  org: dummyOrg,
  editedOrgName: '',
  editedInviteMail: '',
  orgDialogOpen: false,
  inviteDialogOpen: false,
};

export const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {
    setOrgUser(state, action) {
      state.org.org_user = action.payload;
    },
    setOrgName(state, action) {
      state.org.org_name = action.payload;
    },
    setEditedOrgName(state, action) {
      state.editedOrgName = action.payload;
    },
    setEditedInviteMail(state, action) {
      state.editedInviteMail = action.payload;
    },
    setOrgDialogOpen(state, action) {
      state.orgDialogOpen = action.payload;
    },
    setInviteDialogOpen(state, action) {
      state.inviteDialogOpen = action.payload;
    },
  },
});

export const {
  setOrgUser,
  setOrgName,
  setEditedOrgName,
  setEditedInviteMail,
  setOrgDialogOpen,
  setInviteDialogOpen,
} = orgSlice.actions;

export const selectOrgId = (state: RootState) => state.org.org.org_id;
export const selectOrgUser = (state: RootState) => state.org.org.org_user;
export const selectOrgName = (state: RootState) => state.org.org.org_name;
export const selectEditedOrgName = (state: RootState) =>
  state.org.editedOrgName;
export const selectEditedInviteMail = (state: RootState) =>
  state.org.editedInviteMail;
export const selectOrgDialogOpen = (state: RootState) =>
  state.org.orgDialogOpen;
export const selectInviteDialogOpen = (state: RootState) =>
  state.org.inviteDialogOpen;

export default orgSlice.reducer;
