import React, { memo } from "react";
import { useAppSelector } from "../../hooks/redux";
import { TUserFromAccessToken } from "../../types/TypeUser";
import { selectUser } from "../../store/selectors";
import { IUserState } from "../../types/TypeState";
import { formatDate } from "../../utils/utils";
import Clock from "./Clock";
import { taskApi } from "../../service/taskService";
import s from "./Header.module.scss";
import Navigation from "./Navigation";
import MobileMenu from "../UI/ToggleMenu/Menu";

function Header(): JSX.Element {
  const { data } = useAppSelector<IUserState>(selectUser);
  const mediaQuery = window.matchMedia("(max-width: 992px)");
  const date = new Date();
  const user = data as TUserFromAccessToken;
  const { data: tasks, error } = taskApi.useGetTaskQuery(formatDate);
  let length = 0;

  if (tasks) {
    if (tasks[0]?.taskDate?.length > 0) {
      length = tasks[0]?.taskDate?.length;
    }
  }
  if (mediaQuery.matches) {
    console.log("Media Query Matched!");
  }
  // eslint-disable-next-line no-console
  if (error) console.log("TaskError__Header", error);

  return (
    <header className={s.header}>
      <div>
        <h3 className={s.header_title}>Привет {user?.name}</h3>
        <span className={s.header_subtitle}>
          Задач на сегодня{" "}
          <b className={s.header_subtitle_tasks_count}>{length === 0 ? "нет" : length}</b>
        </span>
      </div>
      <div className={s.header_time}>
        Сегодня: {date.toLocaleDateString()} - <Clock />
      </div>
      <Navigation />
      <MobileMenu />
    </header>
  );
}

export default memo(Header);
