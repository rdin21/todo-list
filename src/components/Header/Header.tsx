import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { TUserFromAccessToken } from "../../types/TypeUser";
import { selectUser } from "../../store/selectors";
import { IUserState } from "../../types/TypeState";
import { ADD_TASK_ROUTE, HOME_ROUTE, USER_ROUTE, CALENDAR_ROUTE } from "../../routes/pathRoutes";
import Clock from "./Clock";
const Header: FC = () => {
  const { data } = useAppSelector<IUserState>(selectUser);
  const date = new Date();
  const user = data as TUserFromAccessToken;

  return (
    <header>
      <div className="header-title">
        <div>
          <h3>Hey {user.name}</h3>
          <span className="header-subtitle">Today you have 12 task</span>
        </div>
        <div className="header-title-time">
          Today: {date.toLocaleDateString()} <Clock />
        </div>
        <nav>
          <ul className="nav">
            <li className="nav-link">
              <Link to={HOME_ROUTE}>Home</Link>
            </li>
            <li className="nav-link">
              <Link to={ADD_TASK_ROUTE}>Categories</Link>
            </li>

            <li className="nav-link">
              <Link to={USER_ROUTE}>User</Link>
            </li>
            <li className="nav-link">
              <Link to={CALENDAR_ROUTE}>Calendar</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
