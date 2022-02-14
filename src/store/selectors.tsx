import {
  IUserState,
  // RootState,
} from "../types/TypeState";

export const selectUser = (s: any): IUserState => s?.user;
