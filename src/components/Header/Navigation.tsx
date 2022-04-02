import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CALENDAR_ROUTE, HOME_ROUTE, LOGIN_ROUTE, USER_ROUTE } from "../../routes/pathRoutes";
import s from "./Header.module.scss";

export default function Navigation(): JSX.Element {
  const navigate = useNavigate();
  const exit = (): void => {
    localStorage.removeItem("access_token");
    navigate(LOGIN_ROUTE);
  };
  return (
    <nav>
      <ul className={s.nav}>
        <li className={s.nav_link}>
          <Link to={HOME_ROUTE}>Главная</Link>
        </li>

        <li className={s.nav_link}>
          <Link to={USER_ROUTE}>Пользователь</Link>
        </li>
        <li className={s.nav_link}>
          <Link to={CALENDAR_ROUTE}>Календарь</Link>
        </li>
        <li className={s.nav_link}>
          <a onClick={() => exit()}>Выйти</a>
        </li>
      </ul>
    </nav>
  );
}
