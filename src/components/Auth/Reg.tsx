import React from "react";
import { Link } from "react-router-dom";
import s from "./Auth.module.scss";
import RegForm from "./RegForm";

function Reg(): JSX.Element {
  return (
    <div className={s.auth_wrapper}>
      <div className={s.registration}>
        <div className={s.registration_header}>
          <h5>Регистрация</h5>
          <Link to="/login">Войти</Link>
        </div>
        <div className={s.registration_body}>
          <RegForm />
        </div>
      </div>
    </div>
  );
}

export default Reg;
