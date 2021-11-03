import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { AUTH, CRED, REG_INFO, JWT, LOGIN_USER } from "../types";

const initialState: AUTH = {
  loginUser: {
    id: "",
    email: "",
    org: "",
    is_activate: false,
  },
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


// ログインユーザー情報の取得
export const fetchAsyncGetLoginUser = createAsyncThunk(
  "auth/getLoginUser",
  async () => {
    const res = await axios.get<LOGIN_USER>(
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


// プロフィールの取得（不要？）
export const fetchAsyncGetMyProf = createAsyncThunk(
  "auth/getMyProfile",
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
  window.location.href = "/";
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ログイン時
    builder.addCase(
      fetchAsyncLogin.fulfilled,
      (state, action: PayloadAction<JWT>) => {
        localStorage.setItem("localJWT", action.payload.access);
        action.payload.access && (window.location.href = "/app");
      }
    );
    builder.addCase(
      fetchAsyncGetLoginUser.fulfilled,
      (state, action: PayloadAction<LOGIN_USER>) => {
        console.log('fetchAsyncGetLoginUser.fulfilled');
        console.log(action.payload);
        return {
          ...state,
          loginUser: action.payload
        };
      });

    builder.addCase(fetchAsyncRegister.fulfilled, () => { });
  },
});


// export const selectIsAuthentificated = (state: RootState) => state.auth.isAuthentificated;

export default authSlice.reducer;
