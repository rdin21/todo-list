import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
} from "@reduxjs/toolkit/dist/query/react";
import { CATEGORIES_API_REDUCER_KEY } from "./constants";
import { URL } from "../api";
import {
  ICategories,
  TCategoriesAndTask,
  TCreateCategories,
  TUpDateCategory,
} from "../types/TypeCategories";
import { ErrorType } from "../types/TypeError";
import { CategoriesPaths } from "./endpoints";
export const categoriesApi = createApi({
  reducerPath: CATEGORIES_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, ErrorType, Record<string, unknown>>,
  tagTypes: ["Categories"],
  endpoints: (build) => ({
    getCategories: build.query<ICategories[], number>({
      query: () => ({
        url: CategoriesPaths.categoriesCRUD,
      }),
      providesTags: () => ["Categories"],
    }),

    getAllCategoriesAndTask: build.query<TCategoriesAndTask[], string>({
      query: (date: string) => ({
        url: CategoriesPaths.getCategoriesAndTasks,
        params: { date },
      }),
    }),

    createCategories: build.mutation<ICategories, TCreateCategories>({
      query: (post) => {
        return {
          url: CategoriesPaths.categoriesCRUD,
          method: "POST",
          body: post,
        };
      },
      invalidatesTags: ["Categories"],
    }),

    deleteCategories: build.mutation<number, number>({
      query: (id: number) => ({
        url: CategoriesPaths.categoriesCRUD,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Categories"],
    }),
    upDateCategories: build.mutation<TUpDateCategory, TUpDateCategory>({
      query: (body) => ({
        url: CategoriesPaths.categoriesCRUD,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});
