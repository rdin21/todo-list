import { categoriesApi } from "../service/categoriesService";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../service/userSlice";
import { taskApi } from "../service/taskService";

const rootReducer = combineReducers({
  user: userReducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const store = () => {
  return configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(taskApi.middleware, categoriesApi.middleware);
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
