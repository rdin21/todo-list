import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faCalendarCheck, faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import "./Menu.scss";
import { Link, useNavigate } from "react-router-dom";
import { CALENDAR_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from "../../../routes/pathRoutes";
export default function StringMenu(): JSX.Element {
  const navigate = useNavigate();
  const exit = (): void => {
    // localStorage.removeItem("access_token");
    // navigate(LOGIN_ROUTE);
    console.log("click");
  };
  return (
    <div className="mobile-menu">
      <nav className="menu">
        <input type="checkbox" className="menu-open" name="menu-open" id="menu-open" />
        <label className="menu-open-button" htmlFor="menu-open">
          <span className="hamburger hamburger-1"></span>
          <span className="hamburger hamburger-2"></span>
          <span className="hamburger hamburger-3"></span>
        </label>

        <Link to={HOME_ROUTE} className="menu-item">
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <Link to={CALENDAR_ROUTE} className="menu-item">
          <FontAwesomeIcon icon={faCalendarCheck} />
        </Link>
        <a onClick={() => exit()} className="menu-item">
          <FontAwesomeIcon icon={faDoorClosed} />{" "}
        </a>
      </nav>
    </div>
  );
}
