import { IUserState } from "../types/TypeState";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectUser = (s: any): IUserState => s.user;
