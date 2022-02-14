import { Task } from "./TypeTask";
export interface ICategories {
  id: number;
  color: string;
  name: string;
  createAt: string;
  updateAt: string;
}

export type TCreateCategories = Pick<ICategories, "color" | "name">;

// export type TColorsCategories = {
//   id?: number;
//   color: string;
//   name: string;
// };
export type TColorsCategories = Pick<ICategories, "id" | "color" | "name">;
export type TCategoriesAndTask = ICategories & { tasks: Task[] };
