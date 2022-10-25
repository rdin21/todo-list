import React from "react";
import TimeIndicator from "./TimeIndicator";
import s from "./TimeLine.module.scss";
interface ILongTimeLineProps {
  hour: number;
  i: number;
  height: number;
}
function LongTimeItem({ hour, height, i }: ILongTimeLineProps): JSX.Element {
  return (
    <>
      <div className={s.time_line_hours} key={i} style={{ height: `${height}px` }}>
        <div className={s.time_line_hours_hour}>{i + 1}</div>
        {i + 1 === +hour ? <TimeIndicator /> : ""}
      </div>
    </>
  );
}

export default LongTimeItem;
