import { TUserFromAccessToken } from "./TypeUser";
import { DataTypeTasks } from "./TypeTask";
import { ICategories } from "./TypeCategories";

export interface IRootState {
  user: IUserState;
  category: any;
  task: any;
}

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

export type IUserState = State & UserState;
