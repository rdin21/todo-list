import "./Auth.scss";
import { FC, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { TRegisterUser } from "../../types/TypeUser";
import { useAppDispatch } from "../../hooks/redux";
import { registration } from "../../service/userService";
const Reg: FC = () => {
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
    // return alert(JSON.stringify(signUp));
    dispatch(registration(signUp));
  };
  return (
    <div className="auth-wrapper">
      <div className="registration">
        <div className="registration-header">
          <h5>Регистрация</h5>
          <Link to="/login">Войти</Link>
        </div>
        <div className="registration-body">
          <input
            type="text"
            name="name"
            placeholder="Имя"
            value={signUp.name}
            onChange={onChangeSignUp}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Фамилия"
            value={signUp.lastname}
            onChange={onChangeSignUp}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signUp.email}
            onChange={onChangeSignUp}
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={signUp.password}
            onChange={onChangeSignUp}
          />
          <button onClick={onSubmit}>Зарегистрировать</button>
          {"" && {}}
        </div>
      </div>
    </div>
  );
};

export default Reg;
