import { FC } from "react";
import {
  REGISTRATION_ROUTE,
  LOGIN_ROUTE,
  HOME_ROUTE,
  CALENDAR_ROUTE,
  ALL_ROUTES,
} from "../routes/pathRoutes";
import { Reg, Login } from "../components/Auth";
import { Home, Calendar } from "../pages";
import NotFoundRoute from "../components/NotFoundRoute/Index";
interface RoutesTypes {
  path: string;
  Component: FC;
}

export const allRoutes: RoutesTypes[] = [
  {
    path: REGISTRATION_ROUTE,
    Component: Reg,
  },
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: HOME_ROUTE,
    Component: Home,
  },
  {
    path: CALENDAR_ROUTE,
    Component: Calendar,
  },
  {
    path: ALL_ROUTES,
    Component: NotFoundRoute,
  },
];
