import { TUserFromAccessToken } from "./TypeUser";
import { DataTypeTasks } from "./TypeTask";
import { ICategories } from "./TypeCategories";

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
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: {} | TUserFromAccessToken;
}

interface State {
  isLoading: boolean;
  error: string | string[];
}

export type IUserState = State & UserState;
