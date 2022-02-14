import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, registration, check } from "./userService";
import { IUserState } from "../types/TypeState";

const initialState: IUserState = {
  data: {},
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending.type]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.data = action.payload;
    },
    [login.rejected.type]: (state, action: PayloadAction<string[] | string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [registration.pending.type]: (state) => {
      state.isLoading = true;
    },
    [registration.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.data = action.payload;
    },
    [registration.rejected.type]: (state, action: PayloadAction<string[] | string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [check.pending.type]: (state) => {
      state.isLoading = true;
    },
    [check.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.data = action.payload;
    },
    [check.rejected.type]: (state, action: PayloadAction<string[] | string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export default userSlice.reducer;
