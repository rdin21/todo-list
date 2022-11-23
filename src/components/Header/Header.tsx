import React, { memo } from "react";
import { DataTypeTasks } from "../../types/TypeTask";
import Clock from "./Clock";
import s from "./Header.module.scss";
import Navigation from "./Navigation";

const days = ["Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

interface IHeaderProps {
  userName: string;
  tasks?: DataTypeTasks[];
  getTaskError: unknown;
}
function Header({ userName, tasks, getTaskError }: IHeaderProps): JSX.Element {
  // const mediaQuery = window.matchMedia("(max-width: 992px)");
  const date = new Date();
  let length = 0;

  if (tasks) {
    if (tasks[0]?.taskDate?.length > 0) {
      length = tasks[0]?.taskDate?.length;
    }
  }

  return (
    <header className={s.header}>
      <div>
        <h3 className={s.header_title}>Привет {userName}</h3>
        <span className={s.header_subtitle}>
          Задач на сегодня{" "}
          <b className={s.header_subtitle_tasks_count}>{length === 0 ? "нет" : length}</b>
          {getTaskError ? <span className="error_text"> Ошибка загрузки</span> : ""}
        </span>
      </div>
      <div className={s.header_day} title={date.toLocaleDateString()}>
        {days[date.getDay()] + ": "}
        <Clock style={{ display: "inline-block", fontSize: "0.8rem", color: "gray" }} />
      </div>
      <Navigation />
    </header>
  );
}

export default memo(Header);
