import { FC } from "react";
import {
  REGISTRATION_ROUTE,
  LOGIN_ROUTE,
  HOME_ROUTE,
  USER_ROUTE,
  CALENDAR_ROUTE,
} from "../routes/pathRoutes";
import { Reg, Login } from "../components/Auth";
import { Home, User, Calendar } from "../pages";

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
    path: USER_ROUTE,
    Component: User,
  },
  {
    path: CALENDAR_ROUTE,
    Component: Calendar,
  },
];
