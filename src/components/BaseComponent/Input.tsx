import classNames from "classnames";
import { InputHTMLAttributes } from "react";
import s from "./BaseComponent.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputGroupClassName?: string;
  errorMessageClassName?: string;
  name?: string;
  errorMessage?: string;
}

function Input({
  inputGroupClassName = "input_group",
  errorMessage,
  ...props
}: InputProps): JSX.Element {
  return (
    <div className={classNames(s[inputGroupClassName])}>
      <input {...props} />
      <span style={{ display: errorMessage ? "inline-block" : "none" }}>{errorMessage}</span>
    </div>
  );
}

export default Input;
