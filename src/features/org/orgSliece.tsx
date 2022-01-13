import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ORG_STATE, ORG_USER } from "../types";

// remove later
import { dummyOrg } from "../../DummyData";

const initialState: ORG_STATE = {
  org: dummyOrg,
  editedOrgName: "",
  orgDialogOpen: false,
  inviteDialogOpen: false,
};

export const orgSlice = createSlice({
  name: "org",
  initialState,
  reducers: {
    setOrgName(state, action) {
      state.org.org_name = action.payload;
    },
    setOrgUser(state, action) {
      state.org.org_user = action.payload;
    },
    setOrgDialogOpen(state, action) {
      state.orgDialogOpen = action.payload;
    },
  },
});

export const { setOrgName, setOrgUser, setOrgDialogOpen } = orgSlice.actions;

export const selectOrgId = (state: RootState) => state.org.org.org_id;
export const selectOrgName = (state: RootState) => state.org.org.org_name;
export const selectOrgUser = (state: RootState) => state.org.org.org_user;
export const selectOrgDialogOpen = (state: RootState) =>
  state.org.orgDialogOpen;

export default orgSlice.reducer;
