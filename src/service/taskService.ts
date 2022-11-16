import {
  CheckDate,
  CreateTask,
  UpdateStatus,
  DataTypeTasks,
  Task,
  UpdateTask,
} from "../types/TypeTask";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { URL } from "../api";
import { TASKS_API_REDUCER_KEY } from "./constants";
import { TasksPaths } from "./endpoints";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return { error: err.response?.data[0] };
    }
  };

export const taskApi = createApi({
  reducerPath: TASKS_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery({
    baseUrl: URL ? URL : "",
  }),

  tagTypes: ["Task"],
  endpoints: (build) => ({
    getTask: build.query<DataTypeTasks[], string>({
      query: (date) => ({
        url: TasksPaths.getTask + `?date=${date}`,
        method: "GET",
      }),

      providesTags: () => ["Task"],
    }),
    createTask: build.mutation<CreateTask, CreateTask>({
      query: (task: CreateTask) => ({
        url: TasksPaths.tasksCUD,
        method: "POST",
        data: task,
      }),
      invalidatesTags: [{ type: "Task" }],
    }),
    checkCreateDate: build.query<CheckDate, string>({
      query: (date: string) => ({
        url: TasksPaths.checkCreateDate + `?date=${date}`,
        method: "GET",
      }),
    }),

    deleteTask: build.mutation<number, number>({
      query: (id: number) => ({
        url: TasksPaths.tasksCUD,
        method: "DELETE",
        data: { id },
      }),
      invalidatesTags: ["Task"],
    }),

    updateTask: build.mutation<number, UpdateTask>({
      query: (body) => ({
        url: TasksPaths.tasksCUD,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: ["Task"],
    }),

    setStatusTrue: build.mutation<Task, UpdateStatus>({
      query: (body) => ({
        url: TasksPaths.taskSetStatusPatch,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["Task"],
    }),
    setStatusFalse: build.mutation<Task, UpdateStatus>({
      query: (body) => ({
        url: TasksPaths.taskSetStatusPatch,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});
