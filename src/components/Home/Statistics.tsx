import React from "react";
import ProgressCircle from "./ProgressCircle/ProgressCircle";
import ProgressColumn from "./ProgressColumn/ProgressColumn";
import s from "./Home.module.scss";

export default function Statistics(): JSX.Element {
  return (
    <div className={s.progress}>
      <ProgressCircle />
      <ProgressColumn />
    </div>
  );
}
