import React, { memo } from "react";
import { useAppSelector } from "../../hooks/redux";
import { TUserFromAccessToken } from "../../types/TypeUser";
import { IUserState } from "../../types/TypeState";
import { formatDate } from "../../utils/utils";
import Clock from "./Clock";
import { taskApi } from "../../service/taskService";
import s from "./Header.module.scss";
import Navigation from "./Navigation";

const days = ["Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

function Header(): JSX.Element {
  const { data } = useAppSelector<IUserState>((s) => s.user);
  // const mediaQuery = window.matchMedia("(max-width: 992px)");
  const date = new Date();
  const user = data as TUserFromAccessToken;
  const { data: tasks, error } = taskApi.useGetTaskQuery(formatDate);
  let length = 0;

  if (tasks) {
    if (tasks[0]?.taskDate?.length > 0) {
      length = tasks[0]?.taskDate?.length;
    }
  }

  // eslint-disable-next-line no-console
  if (error) console.error("Header.tsx file", error);

  return (
    <header className={s.header}>
      <div>
        <h3 className={s.header_title}>Привет {user?.name}</h3>
        <span className={s.header_subtitle}>
          Задач на сегодня{" "}
          <b className={s.header_subtitle_tasks_count}>{length === 0 ? "нет" : length}</b>
          {error ? <span className="error_text"> Ошибка загрузки</span> : ""}
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
