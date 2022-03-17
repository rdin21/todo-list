import s from "./ProgressCircle.module.scss";
import React from "react";
import classNames from "classnames";
interface InfoProps {
  ready: number;
  notReady: number;
}

export default function Info({ ready = 0, notReady = 0 }: InfoProps): JSX.Element {
  return (
    <div className={s.info}>
      <ul className={s.info__list}>
        <li className={s.info__item}>
          <div
            className={classNames(`${s.percentage__progress}`, `${s.percentage__progress_green}`)}
          >
            {Math.round(ready) + "%"}
          </div>
          Ready
        </li>
        <li className={s.info__item}>
          <div className={classNames(`${s.percentage__progress}`, `${s.percentage__progress_red}`)}>
            {Math.round(notReady) + "%"}
          </div>
          Not done
        </li>
      </ul>
    </div>
  );
}
