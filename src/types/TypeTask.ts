export interface Task {
  id: number;
  date: string;
  text: string;
  time: string;
  status: boolean;
  updateAt: string;
  createAt: string;
  taskDateId?: number;
  categoriesID?: number;
  userId?: number;
}

export type DataTypeTasks = Pick<Task, "id" | "date" | "status" | "createAt" | "updateAt"> & {
  taskDate: Task[];
};
export type CheckDate = Pick<Task, "id" | "createAt" | "updateAt"> & {
  date: string;
};

export type CreateTask = Pick<
  Task,
  "date" | "text" | "time" | "categoriesID" | "taskDateId" | "userId" | "status"
>;

export type UpdateTask = Pick<Task, "id" | "text">;

export type UpdateStatus = Pick<Task, "id" | "status">;
