import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import { useAppSelector } from "../hooks/redux";
import { taskApi } from "../service/taskService";
import { TUserFromAccessToken } from "../types/TypeUser";
import { formatDate } from "../utils/utils";
import { allRoutes } from "./Routes";
const AppRoutes: FC = () => {
  const user = useAppSelector((s) => s.user.data) as TUserFromAccessToken;
  const { data: tasks, error: getTaskError } = taskApi.useGetTaskByDateQuery(
    `?date=${formatDate}&userId=${user.id}`
  );
  return (
    <>
      <div className="container">
        <Header userName={user.name} tasks={tasks} getTaskError={getTaskError} />
      </div>
      <Routes>
        {allRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </>
  );
};

export default AppRoutes;
