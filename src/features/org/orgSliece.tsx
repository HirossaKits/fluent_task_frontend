import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { ORG, ORG_INFO } from '../types';

const initialState: ORG = {
  org_info: {
    org_id: '',
    org_name: '',
    is_private: true,
    org_owner_id: '',
    org_admin_id: [],
    org_user: [],
  },
  editedOrgName: '',
  editedInviteMail: '',
  orgDialogOpen: false,
  inviteDialogOpen: false,
  invite: [],
};

export const fetchAsyncGetOrgInfo = createAsyncThunk(
  'org/getOrgInfo',
  async (_, thunkAPI) => {
    const user_id = (thunkAPI.getState() as RootState).auth.loginUserInfo
      .user_id;
    const settings = (thunkAPI.getState() as RootState).auth.personalSettings;

    if (settings.private_mode) {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/org/private/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.localJWT}`,
          },
        }
      );
      return res.data;
    } else {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/org/${settings.selected_org_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.localJWT}`,
          },
        }
      );
      return res.data;
    }
  }
);

export const fetchAsyncUpdateOrgInfo = createAsyncThunk(
  'org/update',
  async (org_name: string, thunkAPI) => {
    const org_id = (thunkAPI.getState() as RootState).org.org_info.org_id;
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/org/${org_id}`,
      { org_name: org_name },
      {
        headers: {
          Authorization: `Bearer ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

// 組織への招待を登録
export const fetchAsycnRegisterInvite = createAsyncThunk(
  'invite',
  async (editedInviteMail: string, thunkAPI) => {
    const org_id = (thunkAPI.getState() as RootState).org.org_info.org_id;
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/invite`,
      { org_id: org_id, email: editedInviteMail },
      {
        headers: {
          Authorization: `Bearer ${localStorage.localJWT}`,
        },
      }
    );
  }
);

// 組織への招待情報を取得
export const fetchAsycnGetInvite = createAsyncThunk(
  'invite/getInvite',
  async (_, thunkAPI) => {
    const user_id = (thunkAPI.getState() as RootState).auth.loginUserInfo
      .user_id;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/invite/user/${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

// 組織への招待を承認、または拒否
export const fetchAsyncUpdateInvite = createAsyncThunk(
  'invite/update',
  async (data: { invite_id: string; result: boolean }) => {
    const body = data.result
      ? { accepted: true, rejected: false }
      : { accepted: true, rejected: true };

    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/invite/${data.invite_id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {
    setOrgUser(state, action) {
      state.org_info.org_user = action.payload;
    },
    setOrgName(state, action) {
      state.org_info.org_name = action.payload;
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
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetOrgInfo.fulfilled,
      (state, action: PayloadAction<ORG_INFO>) => {
        state.org_info = action.payload;
      }
    );
    builder.addCase(fetchAsyncUpdateOrgInfo.fulfilled, (state, action) => {
      state.org_info = action.payload;
    });
    // 招待を取得
    builder.addCase(fetchAsycnGetInvite.fulfilled, (state, action) => {
      return {
        ...state,
        invite: action.payload,
      };
    });
    builder.addCase(fetchAsyncUpdateInvite.fulfilled, (state, action) => {
      return {
        ...state,
        invite: action.payload,
      };
    });
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

export const selectOrgInfo = (state: RootState) => state.org.org_info;
export const selectEditedOrgName = (state: RootState) =>
  state.org.editedOrgName;
export const selectEditedInviteMail = (state: RootState) =>
  state.org.editedInviteMail;
export const selectOrgDialogOpen = (state: RootState) =>
  state.org.orgDialogOpen;
export const selectInviteDialogOpen = (state: RootState) =>
  state.org.inviteDialogOpen;
export const selectInvite = (state: RootState) => state.org.invite;
export const selectInviteCount = (state: RootState) => state.org.invite.length;

export default orgSlice.reducer;
