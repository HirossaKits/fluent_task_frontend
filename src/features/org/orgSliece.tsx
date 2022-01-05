import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ORG_STATE, ORG_USER } from '../types';

// remove later
import { dummyOrg } from '../../DummyData';

const initialState: ORG_STATE = dummyOrg;
// = {
//   org_id: '',
//   org_name: '',
//   org_user: [],
// };

export const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {
    setOrgName(state, action) {
      state.org_name = action.payload;
    },
    setOrgUser(state, action) {
      state.org_user = action.payload;
    },
  },
});

export const { setOrgName, setOrgUser } = orgSlice.actions;

export const selectOrgId = (state: RootState) => state.org.org_id;
export const selectOrgName = (state: RootState) => state.org.org_name;
export const selectOrgUser = (state: RootState) => state.org.org_user;

export default orgSlice.reducer;
