import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import axios from 'axios';
import {
  AUTH,
  SIGNIN_INFO,
  SIGNUP_INFO,
  JWT,
  USER_INFO,
  // PROF,
  EDITED_PROF,
  PERSONAL_SETTINGS,
  LOGIN_USER_INFO,
} from '../types';

const userInfo: LOGIN_USER_INFO = {
  user_id: '',
  is_premium: false,
  first_name: '',
  last_name: '',
  avatar_img: '',
  comment: '',
  own_org: [],
  joined_org: [
    {
      org_id: '',
      org_name: '',
      is_private: true,
    },
  ],
};

const initialState: AUTH = {
  loginUserInfo: userInfo,
  editedProf: {
    first_name: '',
    last_name: '',
    comment: '',
  },
  personalSettings: {
    dark_mode: false,
    tooltip: true,
    private_mode: true,
    selected_org_id: '',
  },
  profiles: [userInfo],
};

// サインアップ
export const fetchAsyncSignup = createAsyncThunk(
  'auth/register',
  async (auth: SIGNUP_INFO) => {
    const res = await axios.post<JWT>(
      `${process.env.REACT_APP_API_URL}/api/auth/signup`,
      auth,
      {
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
    return res.data;
  }
);

// サインイン
export const fetchAsyncSignin = createAsyncThunk(
  'auth/login',
  async (auth: SIGNIN_INFO) => {
    const res = await axios.post<JWT>(
      `${process.env.REACT_APP_API_URL}/api/auth/signin`,
      auth
    );
    return res.data;
  }
);

// ログインユーザーの基本情報取得
export const fetchAsyncGetLoginUser = createAsyncThunk(
  'auth/getLoginUserCred',
  async (_, thunkAPI) => {
    const res = await axios.get<LOGIN_USER_INFO>(
      `${process.env.REACT_APP_API_URL}/api/user`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

// プロフィール更新
export const fetchAsyncUpdateProf = createAsyncThunk(
  'auth/updateProf',
  async (upload_file: null | File, thunkAPI) => {
    const user_id = (thunkAPI.getState() as RootState).auth.loginUserInfo
      .user_id;
    const editedProf = (thunkAPI.getState() as RootState).auth.editedProf;
    const res = await axios.put<USER_INFO>(
      `${process.env.REACT_APP_API_URL}/api/user/${user_id}`,
      editedProf,
      {
        headers: {
          Authorization: `Bearer ${localStorage.localJWT}`,
        },
      }
    );

    if (upload_file) {
      const uploadData = new FormData();
      uploadData.append('upload_file', upload_file, upload_file.name);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/avatar/${user_id}`,
        uploadData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.localJWT}`,
          },
        }
      );
      return res.data;
    }

    return res.data;
  }
);

// 個人設定の取得
export const fetchAsyncGetPersonalSettings = createAsyncThunk(
  'auth/getPersonalSettings',
  async (_, thunkAPI) => {
    const user_id = (thunkAPI.getState() as RootState).auth.loginUserInfo
      .user_id;
    const res = await axios.get<PERSONAL_SETTINGS>(
      `${process.env.REACT_APP_API_URL}/api/settings/${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

// 個人設定の更新
export const fetchAsyncUpdateSettings = createAsyncThunk(
  'auth/updatePersonalSetting',
  async (settings: PERSONAL_SETTINGS, thunkAPI) => {
    const user_id = (thunkAPI.getState() as RootState).auth.loginUserInfo
      .user_id;
    const res = await axios.put<PERSONAL_SETTINGS>(
      `${process.env.REACT_APP_API_URL}/api/settings/${user_id}`,
      settings,
      {
        headers: {
          Authorization: `Bearer ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

// ログアウト
export const logOut = () => {
  localStorage.removeItem('localJWT');
  window.location.href = '/login';
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEditedProf(state, action) {
      state.editedProf = action.payload;
    },
    setPersonalSettings(state, action) {
      state.personalSettings = action.payload;
    },
  },
  extraReducers: (builder) => {
    // サインアップ
    builder.addCase(
      fetchAsyncSignup.fulfilled,
      (state, action: PayloadAction<JWT>) => {
        localStorage.setItem('localJWT', action.payload.access);
        action.payload.access && (window.location.href = '/app');
      }
    );
    // サインイン
    builder.addCase(
      fetchAsyncSignin.fulfilled,
      (state, action: PayloadAction<JWT>) => {
        localStorage.setItem('localJWT', action.payload.access);
        action.payload.access && (window.location.href = '/app');
      }
    );
    // ログインユーザーの基本情報
    builder.addCase(
      fetchAsyncGetLoginUser.fulfilled,
      (state, action: PayloadAction<LOGIN_USER_INFO>) => {
        return {
          ...state,
          loginUserInfo: action.payload,
        };
      }
    );
    // プロフィール更新
    builder.addCase(fetchAsyncUpdateProf.fulfilled, (state, action) => {
      return {
        ...state,
        loginUserInfo: action.payload,
      };
    });
    // 個人設定取得
    builder.addCase(
      fetchAsyncGetPersonalSettings.fulfilled,
      (state, action: PayloadAction<PERSONAL_SETTINGS>) => {
        return {
          ...state,
          personalSettings: action.payload,
        };
      }
    );
  },
});

export const { setEditedProf, setPersonalSettings } = authSlice.actions;

export const selectLoginUserInfo = (state: RootState) =>
  state.auth.loginUserInfo;
export const selectEditedProf = (state: RootState) => state.auth.editedProf;
export const selectPersonalSettings = (state: RootState) =>
  state.auth.personalSettings;

export default authSlice.reducer;
