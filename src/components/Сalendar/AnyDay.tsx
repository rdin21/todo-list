import React from "react";
import { DataTypeTasks, Task } from "../../types/TypeTask";
import s from "./Calendar.module.scss";
interface AnyDayDataProps {
  data: DataTypeTasks[] | undefined;
}

export default function AnyDay({ data }: AnyDayDataProps): JSX.Element {
  let date;
  let tasks;
  if (data) {
    date = data[0]?.date;
    tasks = data[0]?.taskDate;
  }

  return (
    <section className={s.info_day}>
      <h1 className={s.info_day_title}>Дата {date}</h1>
      <div className={s.info_day_list}>
        {tasks?.map((el: Task) => (
          <div
            key={el.id}
            className={s.info_day_item}
            style={{ border: `1px solid ${el.status ? "green" : "red"}` }}
          >
            <span>{el.time}</span>
            {el.status ? el.text : <del>{el.text}</del>}
          </div>
        ))}
      </div>
    </section>
  );
}
