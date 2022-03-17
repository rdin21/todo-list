import s from "./ProgressCircle.module.scss";
import React from "react";

interface CircleProps {
  ready: number;
  notReady: number;
}

export default function Circle({ ready = 0, notReady = 0 }: CircleProps): JSX.Element {
  return (
    <svg className={s.progress__circle} width="150" height="150" viewBox="0 0 50 50">
      <circle
        style={{ strokeDasharray: `${ready} 100` }}
        className={s.progress__circle__arc}
        r="15.9"
        cx="50%"
        cy="50%"
      ></circle>
      <circle
        style={{
          strokeDasharray: `${notReady} 100`,
          strokeDashoffset: isNaN(-ready) ? 0 : -ready,
        }}
        className={s.progress__circle__arc}
        r="15.9"
        cx="50%"
        cy="50%"
      ></circle>
    </svg>
  );
}
