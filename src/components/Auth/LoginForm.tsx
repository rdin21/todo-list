import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { HOME_ROUTE } from "../../routes/pathRoutes";
import { login } from "../../service/userService";
import { TLoginUser } from "../../types/TypeUser";
import { Button, InputGroup } from "../UI/BaseComponent";
import Spinner from "../UI/Loaders/LoaderSpinner";
import s from "./Auth.module.scss";

export default function LoginForm(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const [signIn, setSignIn] = useState<TLoginUser>({
    email: "",
    password: "",
  });

  const onChangeSignUp = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSignIn({
      ...signIn,
      [name]: value,
    });
  };

  const onSubmit = (): void => {
    setErrors({});
    setIsLoading(true);
    const obj: any = {};

    dispatch(login(signIn))
      .then((res: any) => {
        setIsLoading(false);
        if (res?.payload?.statusCode || Array.isArray(res.payload)) {
          if (Array.isArray(res.payload)) {
            res.payload.forEach((el: string) => {
              const msg = el.split("-");
              obj[msg[0].trim()] = msg[1].trim();
            });
            setErrors(obj);
          } else {
            obj["message"] = res.payload.message;
            setErrors(obj);
          }
        } else {
          navigate(HOME_ROUTE);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSubmitKeyEvent = ({ key }: KeyboardEvent): void => {
    if (key === "Enter") onSubmit();
  };

  useEffect(() => {
    document.addEventListener("keydown", onSubmitKeyEvent);
    return () => document.removeEventListener("keydown", onSubmitKeyEvent);
  });

  return (
    <form>
      <InputGroup
        type="email"
        name="email"
        placeholder="Email"
        value={signIn.email}
        onChange={onChangeSignUp}
        errorMessage={errors ? errors["email"] : ""}
      />
      <InputGroup
        type="password"
        name="password"
        placeholder="Пароль"
        value={signIn.password}
        onChange={onChangeSignUp}
        errorMessage={errors ? errors["password"] || errors["message"] : ""}
      />
      {loading ? (
        <Spinner />
      ) : (
        <Button
          className={s.submit_btn}
          onClick={onSubmit}
          name="Войти"
          title="Войти"
          isLoading={loading}
        >
          Войти
        </Button>
      )}
    </form>
  );
}
