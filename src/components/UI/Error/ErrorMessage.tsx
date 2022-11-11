import React from "react";
import classNames from "classnames";
import s from "./Error.module.scss";

interface IErrorMessageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message?: any;
  classNameError?: string;
}

function ErrorMessage({ message, classNameError }: IErrorMessageProps): JSX.Element | null {
  if (message) {
    return <div className={classNames(s.error_message, classNameError)}>{message}</div>;
  }
  return null;
}

export default ErrorMessage;
