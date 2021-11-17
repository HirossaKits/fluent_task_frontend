import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import {
  AUTH,
  CRED,
  REG_INFO,
  JWT,
  LOGIN_USER_CRED,
  PROF,
  EDITED_PROF,
  PERSONAL_SETTINGS
} from "../types";
import taskSlice from "../task/taskSlice";
import { profile } from "console";
import { setSettingsMenuOpen } from "../main/mainSlice";

const initialState: AUTH = {
  loginUserCred: {
    id: "",
    email: "",
    org: "",
    is_activate: false,
    is_premium: false,
    is_administrator: false,
  },
  loginUserProf: {
    user_id: "",
    first_name: "",
    last_name: "",
    avatar_img: '',
    comment: ''
  },
  editedProf: {
    user_id: "",
    first_name: "",
    last_name: "",
    avatar_img: '',
    upload_file: null,
    comment: ''
  },
  personalSettings: {
    dark_mode: false,
    show_own: false,
    project: null,
  },
  profiles: [{
    user_id: "",
    first_name: "",
    last_name: "",
    avatar_img: '',
    comment: ''
  }]
};


// ログイン
export const fetchAsyncLogin = createAsyncThunk(
  "auth/login",
  async (auth: CRED) => {
    const res = await axios.post<JWT>(
      `${process.env.REACT_APP_API_URL}/authen/jwt/create`,
      auth,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);


// 新規登録
export const fetchAsyncRegister = createAsyncThunk(
  "auth/register",
  async (auth: REG_INFO) => {
    const res = await axios.post<REG_INFO>(
      `${process.env.REACT_APP_API_URL}/api/user/create/`,
      auth,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return res.data;
  }
);


// ログインユーザーの基本情報取得
export const fetchAsyncGetLoginUser = createAsyncThunk(
  "auth/getLoginUserCred",
  async () => {
    console.log(localStorage.localJWT);
    const res = await axios.get<LOGIN_USER_CRED>(
      `${process.env.REACT_APP_API_URL}/api/user/login/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);


// ログインユーザーのプロフィール取得
export const fetchAsyncGetLoginUserProf = createAsyncThunk(
  "auth/getLoginUserProf",
  async (user_id: string) => {
    const res = await axios.get<PROF>(
      `${process.env.REACT_APP_API_URL}/api/user/profile/${user_id}/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

// ログインユーザーのプロフィール更新
export const fetchAsyncUpdateProf = createAsyncThunk(
  "auth/updateProf",
  async (editedProf: EDITED_PROF, thunkAPI) => {
    // const user_id = (thunkAPI.getState() as RootState).auth.loginUserCred.id;
    const uploadData = new FormData();
    uploadData.append("last_name", editedProf.last_name);
    uploadData.append("first_name", editedProf.first_name);
    uploadData.append("comment", editedProf.comment);
    editedProf.upload_file && uploadData.append("avatar_img", editedProf.upload_file, editedProf.upload_file.name);
    const res = await axios.put<PROF>(
      `${process.env.REACT_APP_API_URL}/api/user/profile/${editedProf.user_id}/`,
      uploadData,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    console.log(res);
    return res.data;
  }
);

// 個人設定の取得
export const fetchAsyncGetPersonalSettings = createAsyncThunk(
  "auth/getPersonalSettings",
  async (user_id: string) => {
    const res = await axios.get<PERSONAL_SETTINGS>(
      `${process.env.REACT_APP_API_URL}/api/user/setting/${user_id}/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`
        }
      }
    );
    console.log(res);
    return res.data;
  }
);

// 個人設定の更新
export const fetchAsyncUpdateSettings = createAsyncThunk(
  "auth/updatePersonalSetting",
  async (settings: PERSONAL_SETTINGS, thunkAPI) => {
    const user_id = (thunkAPI.getState() as RootState).auth.loginUserCred.id;
    const res = await axios.put<PERSONAL_SETTINGS>(
      `${process.env.REACT_APP_API_URL}/api/user/setting/${user_id}/`,
      settings,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`
        }
      }
    );
    return res.data;
  }

);


// プロフィールの取得
export const fetchAsyncGetProfiles = createAsyncThunk(
  "auth/getProfile",
  async () => {
    const res = await axios.get<PROF[]>(
      `${process.env.REACT_APP_API_URL}/api/user/profile/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

// ログアウト
export const logOut = () => {
  localStorage.removeItem("localJWT");
  window.location.href = "/login";
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEditedProf(state, action) {
      console.log(action.payload);
      state.editedProf = action.payload;
    },
    setPersonalSettings(state, action) {
      state.personalSettings = action.payload;
    }
  },
  extraReducers: (builder) => {
    // ログイン時
    builder.addCase(
      fetchAsyncLogin.fulfilled,
      (state, action: PayloadAction<JWT>) => {
        console.log('fetchAsyncLogin.fulfilled');
        console.log(action.payload);
        localStorage.setItem("localJWT", action.payload.access);
        action.payload.access && (window.location.href = "/app");
      }
    );
    builder.addCase(
      fetchAsyncGetLoginUser.fulfilled,
      (state, action: PayloadAction<LOGIN_USER_CRED>) => {
        console.log('fetchAsyncGetLoginUserCred.fulfilled');
        console.log(action.payload);
        return {
          ...state,
          loginUserCred: action.payload
        };
      }
    );
    builder.addCase(
      fetchAsyncGetLoginUserProf.fulfilled,
      (state, action: PayloadAction<PROF>) => {
        console.log('fetchAsyncGetLoginUserProf.fulfilled');
        console.log(action.payload);
        return {
          ...state,
          loginUserProf: action.payload
        };
      }
    );
    builder.addCase(
      fetchAsyncUpdateProf.fulfilled, (state, action) => {
        console.log('fetchAsyncUpdateProf.fulfilled');
        return {
          ...state,
          loginUserProf: action.payload
        };
      }
    );
    builder.addCase(
      fetchAsyncGetPersonalSettings.fulfilled,
      (state, action: PayloadAction<PERSONAL_SETTINGS>) => {
        console.log("fetchAsyncGetPersonalSettings.fulfilled");
        return {
          ...state,
          personalSettings: action.payload
        };
      }
    );
    builder.addCase(
      fetchAsyncGetProfiles.fulfilled,
      (state, action: PayloadAction<PROF[]>) => {
        return { ...state, profiles: action.payload };
      }
    );
  },
});


// export const selectIsAuthentificated = (state: RootState) => state.auth.isAuthentificated;
// export const selectLoginUserCred = (state: RootState) => state.auth.loginUserCred;
export const {
  setEditedProf,
  setPersonalSettings
} = authSlice.actions;

export const selectLoginUserCred = (state: RootState) => state.auth.loginUserCred;
export const selectLoginUserProf = (state: RootState) => state.auth.loginUserProf;
export const selectEditedProf = (state: RootState) => state.auth.editedProf;
export const selectPersonalSettings = (state: RootState) => state.auth.personalSettings;


export default authSlice.reducer;
