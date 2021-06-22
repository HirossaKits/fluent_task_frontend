import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';
import axios from "axios";
import {
  CRED,
  JWT,
  // LOGIN_USER,

} from '../types';



export const fetchAsyncLogin = createAsyncThunk('auth/login', async (auth: CRED) => {
  const res = await axios.post<JWT>(`${process.env.API_URL}/auth/jwt/create`,
    auth,
    {
      headers: {
        "Content-type": "application/json",
      },
    });
  return res.data;
});

const initialState = {
  loginUser: {
    id: 0,
    username: "",
  }

};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncLogin.fulfilled,
      (state, action: PayloadAction<JWT>) => {
        // state.
      }
    );
  }
});;

export default authSlice.reducer;





