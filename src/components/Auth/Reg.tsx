import { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TRegisterUser } from "../../types/TypeUser";
import { useAppDispatch } from "../../hooks/redux";
import { registration } from "../../service/userService";
import { HOME_ROUTE } from "../../routes/pathRoutes";
import { Button, Input } from "../BaseComponent";
import s from "./Auth.module.scss";

function Reg(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signUp, setSignUp] = useState<TRegisterUser>({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const onChangeSignUp = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSignUp({
      ...signUp,
      [name]: value,
    });
  };

  const onSubmit = (): void => {
    dispatch(registration(signUp));
    navigate(HOME_ROUTE);
  };
  return (
    <div className={s.auth_wrapper}>
      <div className={s.registration}>
        <div className={s.registration_header}>
          <h5>Регистрация</h5>
          <Link to="/login">Войти</Link>
        </div>
        <div className={s.registration_body}>
          <Input
            type="text"
            name="name"
            placeholder="Имя"
            value={signUp.name}
            onChange={onChangeSignUp}
          />
          <Input
            type="text"
            name="lastname"
            placeholder="Фамилия"
            value={signUp.lastname}
            onChange={onChangeSignUp}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={signUp.email}
            onChange={onChangeSignUp}
          />
          <Input
            type="password"
            name="password"
            placeholder="Пароль"
            value={signUp.password}
            onChange={onChangeSignUp}
          />
          <Button onClick={onSubmit} name="Зарегистрировать" title="Зарегистрировать">
            Зарегистрировать
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Reg;
