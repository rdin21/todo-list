import React from "react";
import s from "./Style.module.scss";

interface SpinnerProps {
  text?: string;
  spinnerBlock?: string;
}

export default function Spinner({ text, spinnerBlock }: SpinnerProps): JSX.Element {
  return (
    <div className={spinnerBlock}>
      <div style={{ position: "relative" }}>
        <div className={s.spinner}></div>
        <div style={{ marginLeft: "40px", fontSize: "16px", marginTop: "5px" }}>{text}</div>
      </div>
    </div>
  );
}
