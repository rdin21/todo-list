import React from "react";
import { Link } from "react-router-dom";
import s from "./Auth.module.scss";
import LoginForm from "./LoginForm";

function Login(): JSX.Element {
  return (
    <div className={s.auth_wrapper}>
      <div className={s.registration}>
        <div className={s.registration_header}>
          <h5>Войти</h5>
          <Link to="/registration">Регистрация</Link>
        </div>
        <div className={s.registration_body}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
