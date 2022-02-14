import { TUserFromAccessToken } from "./TypeUser";
import { DataTypeTasks } from "./TypeTask";
import { ICategories } from "./TypeCategories";

// interface UserState {
//   data: {} | TUserFromAccessToken;
// }
// export interface IUserState {
//   data: {} | TUserFromAccessToken;
//   isLoading: boolean;
//   error: string | string[];
// }

// const a: TUserFromAccessToken = {
//   id: 2,
//   name: "s",
//   lastname: "s",
//   email: "s",
//   iat: 1,
//   exp: 3,
// };

export interface ITaskState {
  data: [] | DataTypeTasks[];
  isLoading: boolean;
  error: string | string[];
}
export interface ICategoriesState {
  data: [] | ICategories[];
  isLoading: boolean;
  error: string | string[];
}

interface UserState {
  data: {} | TUserFromAccessToken;
}

interface State {
  isLoading: boolean;
  error: string | string[];
}

// export type ITaskState = State<TaskState>;
export type IUserState = State & UserState;
// export type ICategoriesState = State<CategoryState>;
