import React, { ButtonHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";
import s from "./BaseComponent.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  name?: string;
  children: ReactNode;
  isLoading?: boolean;
}
function Button({ className, isLoading = false, children, ...props }: ButtonProps): JSX.Element {
  return (
    <button {...props} className={classNames(className, isLoading ? s.loadingButton : "")}>
      <span className={isLoading ? s.spinner : ""}></span>
      {children}
    </button>
  );
}

export default Button;
