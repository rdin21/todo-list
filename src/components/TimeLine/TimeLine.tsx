import React, { useRef } from "react";
import { Task } from "../../types/TypeTask";
import { v4 as uuidv4 } from "uuid";
import LongTimeItem from "./LongTimeItem";
import ShortTimeLineItem from "./ShortTimeLineItem";
import s from "./TimeLine.module.scss";

function TimeLine({
  hours,
  lengthLineValue,
}: {
  hours: [Task[]];
  lengthLineValue: string;
}): JSX.Element {
  const refTimeLine = useRef<HTMLDivElement>(null);
  const hour = new Date().getHours();

  return (
    <div className={s.time_line} ref={refTimeLine}>
      {hours.map((el: Task[], i: number) => {
        const height = el.length > 0 ? 70 * el.length : 70;
        return lengthLineValue === "all" ? (
          <ShortTimeLineItem hour={hour} height={height} i={i} key={uuidv4()} />
        ) : (
          <LongTimeItem hour={hour} height={height} i={i} key={uuidv4()} />
        );
      })}
    </div>
  );
}

export default TimeLine;
