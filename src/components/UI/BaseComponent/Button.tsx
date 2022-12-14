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
    <button
      style={{ position: "relative" }}
      {...props}
      className={classNames(className, isLoading ? s.loadingButton : "")}
    >
      <span className={isLoading ? s.spinner : ""} style={{ fontSize: 0 }}></span>
      {children}
    </button>
  );
}

export default Button;
