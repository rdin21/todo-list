import React from "react";
import classNames from "classnames";
import s from "./Loaders.module.scss";

interface ISpinnerProps {
  containerClassName?: string;
  messageClassName?: string;
  big?: boolean;
  message?: string;
}

function Spinner({
  containerClassName,
  messageClassName,
  big = false,
  message,
}: ISpinnerProps): JSX.Element {
  return (
    <div className={classNames(s.spinner_container, containerClassName)}>
      <div className={!big ? s.loading_spinner_big : s.loading_spinner_small}></div>
      <span className={classNames(s.message, messageClassName)}>{message ? message : ""}</span>
    </div>
  );
}
export default Spinner;
