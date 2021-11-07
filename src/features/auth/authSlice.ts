import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { AUTH, CRED, REG_INFO, JWT, LOGIN_USER_CRED, LOGIN_USER_PROF } from "../types";
import taskSlice from "../task/taskSlice";

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
    first_name: "",
    last_name: "",
    avatar_img: '',
    comment: ''
  },
  editedProf: {
    first_name: "",
    last_name: "",
    avatar_img: '',
    comment: ''
  }
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
  async () => {
    const res = await axios.get<LOGIN_USER_PROF[]>(
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


// プロフィールの取得（不要？）
export const fetchAsyncGetProfs = createAsyncThunk(
  "auth/getProfile",
  async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user/profile`,
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
      state.editedProf = action.payload;
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
      (state, action: PayloadAction<LOGIN_USER_PROF[]>) => {
        console.log('fetchAsyncGetLoginUserProf.fulfilled');
        console.log(action.payload);
        return {
          ...state,
          loginUserProf: action.payload[0]
        };
      }
    );
  },
});


// export const selectIsAuthentificated = (state: RootState) => state.auth.isAuthentificated;
// export const selectLoginUserCred = (state: RootState) => state.auth.loginUserCred;
export const {
  setEditedProf,
} = authSlice.actions;

export const selectLoginUserProf = (state: RootState) => state.auth.loginUserProf;
export const selectEditedProf = (state: RootState) => state.auth.editedProf;


export default authSlice.reducer;
