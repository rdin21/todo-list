import React, { memo } from "react";
import ProgressCircle from "./ProgressCircle/ProgressCircle";
import ProgressColumn from "./ProgressColumn/ProgressColumn";
import s from "./Home.module.scss";

function Statistics(): JSX.Element {
  return (
    <div className={s.progress}>
      <ProgressCircle />
      <ProgressColumn />
    </div>
  );
}

export default memo(Statistics);
