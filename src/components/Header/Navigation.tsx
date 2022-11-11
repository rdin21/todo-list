import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import MobileMenu from "../UI/ToggleMenu/Menu";
import { CALENDAR_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from "../../routes/pathRoutes";
import s from "./Header.module.scss";

function Navigation(): JSX.Element {
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
          <Link to={CALENDAR_ROUTE}>Календарь</Link>
        </li>
        <li className={s.nav_link} style={{ cursor: "pointer" }}>
          <a onClick={() => exit()}>Выйти</a>
        </li>
      </ul>
      <MobileMenu />
    </nav>
  );
}

export default memo(Navigation);
