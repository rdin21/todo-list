import { TLoginUser, TAccessToken, TUserFromAccessToken, TRegisterUser } from "../types/TypeUser";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { $host } from "../api";
import jwtDecode from "jwt-decode";
import { AxiosResponse } from "axios";
export const login = createAsyncThunk("USER/LOGIN", async (user: TLoginUser, thunkApi) => {
  try {
    const response = await $host.post<TLoginUser, AxiosResponse<TAccessToken>>("/auth/login", user);
    const { access_token }: TAccessToken = response.data;
    localStorage.setItem("access_token", access_token);
    return jwtDecode<TUserFromAccessToken>(access_token);
  } catch (err: any) {
    return thunkApi.rejectWithValue(err?.response?.data);
  }
});
export const registration = createAsyncThunk(
  "USER/REGISTRATION",
  async (user: TRegisterUser, thunkApi) => {
    try {
      const response = await $host.post<TRegisterUser, AxiosResponse<TAccessToken>>(
        "/auth/registration",
        user
      );
      const { access_token }: TAccessToken = response.data;
      localStorage.setItem("access_token", access_token);
      return jwtDecode<TUserFromAccessToken>(access_token);
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.response?.data);
    }
  }
);
export const check = createAsyncThunk("USER/CHECK", async (_, thunkApi) => {
  try {
    const token = localStorage.getItem("access_token");
    if (token) {
      const response = await $host.get<TAccessToken>("/auth/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { access_token }: TAccessToken = response.data;
      localStorage.setItem("access_token", access_token);
      return jwtDecode<TUserFromAccessToken>(access_token);
    }
  } catch (err: any) {
    return thunkApi.rejectWithValue(err?.response?.data);
  }
});
