import {
  CheckDate,
  CreateTask,
  UpdateStatus,
  DataTypeTasks,
  Task,
  UpdateTask,
} from "../types/TypeTask";
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
} from "@reduxjs/toolkit/dist/query/react";
import { URL } from "../api";
import { ErrorType } from "../types/TypeError";
import { TASKS_API_REDUCER_KEY } from "./constants";

export const taskApi = createApi({
  reducerPath: TASKS_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      // headers.set("Authorization", `Bearer ${localStorage.getItem("access_token")}`);
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, ErrorType, Record<string, unknown>>,
  tagTypes: ["Task"],
  endpoints: (build) => ({
    getTask: build.query<DataTypeTasks[], string>({
      query: (date) => ({
        url: "/date",
        params: {
          date,
        },
      }),

      providesTags: () => ["Task"],
    }),
    createTask: build.mutation<CreateTask, CreateTask>({
      query: (task: CreateTask) => ({
        url: "/task",
        method: "POST",
        body: task,
      }),
      invalidatesTags: [{ type: "Task" }],
    }),
    checkCreateDate: build.query<CheckDate, string>({
      query: (date: string) => ({
        url: "date/check_date",
        params: {
          date,
        },
      }),
    }),

    deleteTask: build.mutation<number, number>({
      query: (id: number) => ({
        url: "/task",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Task"],
    }),

    updateTask: build.mutation<number, UpdateTask>({
      query: (body) => ({
        url: "/task",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Task"],
    }),

    setStatusTrue: build.mutation<Task, UpdateStatus>({
      query: (body) => ({
        url: "/task",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Task"],
    }),
    setStatusFalse: build.mutation<Task, UpdateStatus>({
      query: (body) => ({
        url: "/task",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});
