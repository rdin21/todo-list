import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { HOME_ROUTE } from "../../routes/pathRoutes";
import { registration } from "../../service/userService";
import { TRegisterUser } from "../../types/TypeUser";
import { Button, InputGroup } from "../UI/BaseComponent";
import Loading from "../UI/Preloader/Loading";
import s from "./Auth.module.scss";
let count = 0;
function RegForm(): JSX.Element {
  console.log("RENDER_REG_FORM", count++);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

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
    setErrors({});
    setLoading(true);
    const obj: any = {};

    dispatch(registration(signUp))
      .then((res: any) => {
        setLoading(false);

        if (res.payload.statusCode || Array.isArray(res.payload)) {
          if (Array.isArray(res.payload)) {
            // console.log(res.payload, "////////");
            res.payload.forEach((el: string) => {
              const msg = el.split("-");
              obj[msg[0].trim()] = msg[1].trim();
            });
            // console.log(obj, "[[[[[[[[");
            setErrors(obj);
          } else {
            obj["message"] = res.payload.message;
            setErrors(obj);
          }
        } else {
          navigate(HOME_ROUTE);
        }
      })
      .finally(() => setLoading(false));
  };

  console.log(errors, "**********");

  return (
    <form>
      <InputGroup
        type="text"
        name="name"
        placeholder="Имя"
        value={signUp.name}
        onChange={onChangeSignUp}
        errorMessage={errors ? errors["name"] : ""}
      />
      <InputGroup
        type="text"
        name="lastname"
        placeholder="Фамилия"
        value={signUp.lastname}
        onChange={onChangeSignUp}
        errorMessage={errors ? errors["lastname"] : ""}
      />
      <InputGroup
        type="email"
        name="email"
        placeholder="Email"
        value={signUp.email}
        onChange={onChangeSignUp}
        errorMessage={errors ? errors["email"] : ""}
      />
      <InputGroup
        type="password"
        name="password"
        placeholder="Пароль"
        value={signUp.password}
        onChange={onChangeSignUp}
        errorMessage={errors ? errors["password"] : ""}
      />

      {loading ? (
        <Loading />
      ) : (
        <Button
          onClick={onSubmit}
          name="Зарегистрировать"
          title="Зарегистрировать"
          className={s.submit_btn}
        >
          Зарегистрировать
        </Button>
      )}
    </form>
  );
}
export default RegForm;
