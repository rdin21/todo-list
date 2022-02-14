import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { allRoutes } from "./Routes";
const AppRoutes: FC = () => {
  return (
    <Routes>
      {allRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
