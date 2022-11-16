import React, { memo } from "react";
import { weekdays } from "./daysMonths";
import s from "./Calendar.module.scss";

function Weekdays(): JSX.Element {
  return (
    <div className={s.weekdays}>
      {weekdays.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );
}

export default memo(Weekdays);
