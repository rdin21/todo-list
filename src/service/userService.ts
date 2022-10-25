import { TLoginUser, TAccessToken, TUserFromAccessToken, TRegisterUser } from "../types/TypeUser";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { $host } from "../api";
import jwtDecode from "jwt-decode";
import { AxiosResponse } from "axios";
import { UserPaths } from "./endpoints";
export const login = createAsyncThunk("USER/LOGIN", async (user: TLoginUser, thunkApi) => {
  try {
    const response = await $host.post<TLoginUser, AxiosResponse<TAccessToken>>(
      UserPaths.loginUser,
      user
    );
    const { access_token }: TAccessToken = response.data;
    localStorage.setItem("access_token", access_token);
    return jwtDecode<TUserFromAccessToken>(access_token);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return thunkApi.rejectWithValue(err?.response?.data);
  }
});
export const registration = createAsyncThunk(
  "USER/REGISTRATION",
  async (user: TRegisterUser, thunkApi) => {
    try {
      const response = await $host.post<TRegisterUser, AxiosResponse<TAccessToken>>(
        UserPaths.registrationUser,
        user
      );
      const { access_token }: TAccessToken = response.data;
      localStorage.setItem("access_token", access_token);
      return jwtDecode<TUserFromAccessToken>(access_token);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.response?.data);
    }
  }
);
export const check = createAsyncThunk("USER/CHECK", async (_, thunkApi) => {
  try {
    const token = localStorage.getItem("access_token");
    if (token) {
      const response = await $host.get<TAccessToken>(UserPaths.checkUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { access_token }: TAccessToken = response.data;
      localStorage.setItem("access_token", access_token);
      return jwtDecode<TUserFromAccessToken>(access_token);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return thunkApi.rejectWithValue(err?.response?.data);
  }
});
