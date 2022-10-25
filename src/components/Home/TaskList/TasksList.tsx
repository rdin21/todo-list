import React, { useEffect, useMemo, useState } from "react";
import { categoriesApi } from "../../../service/categoriesService";
import { taskApi } from "../../../service/taskService";
import { formatDate } from "../../../utils/utils";
import { Task } from "../../../types/TypeTask";
import { useLengthTimeLine } from "../../../hooks/useLengthTimeLine";
import Spinner from "../../UI/Loaders/LoaderSpinner";
import TimeLine from "../../TimeLine/TimeLine";
import LongList from "./LongList";
import ShortList from "./ShortList";
import ErrorMessage from "../../UI/Error/ErrorMessage";
import ChangeLengthListBtn from "./ChangeLengthListBtn";
import s from "../Home.module.scss";

function TasksList(): JSX.Element {
  const {
    data: tasks,
    error: getTaskError,
    isLoading: loadingTasks,
  } = taskApi.useGetTaskQuery(formatDate);
  const { data: categories, error: getCategoriesError } = categoriesApi.useGetCategoriesQuery(10);
  const { length, setLength } = useLengthTimeLine();
  const [lengthLineValue, setLengthLineValue] = useState<string>("");

  const [a, seta] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hours: [Task[]] | any = useMemo(() => Array(24).fill([]), [tasks]);
  useEffect(() => {
    if (tasks) {
      for (let i = 0; i < tasks[0]?.taskDate.length; i++) {
        const timeTask = +tasks[0].taskDate[i].time.split(":")[0];
        hours[timeTask - 1] = [...hours[timeTask - 1], tasks[0].taskDate[i]];
      }
    }
    seta(!a);
  }, [tasks]);

  const setLengthLine = (): void => {
    length === "all" ? setLength("short") : setLength("all");
  };
  useEffect(() => {
    setLengthLineValue(length);
  }, [length]);

  return (
    <section className={s.tasks_for_day}>
      <TimeLine hours={hours} lengthLineValue={lengthLineValue} />
      <ChangeLengthListBtn setLengthLine={setLengthLine} lengthLineValue={lengthLineValue} />
      {getTaskError ? <ErrorMessage errorObject={getTaskError} /> : ""}
      {getCategoriesError ? <ErrorMessage errorObject={getCategoriesError} /> : ""}
      <ul className={s.tasks_list}>
        {loadingTasks ? (
          <Spinner message="Загрузка..." />
        ) : (
          <>
            {lengthLineValue === "all" ? (
              <LongList categories={categories} hours={hours} />
            ) : (
              <ShortList categories={categories} hours={hours} />
            )}
          </>
        )}
      </ul>
    </section>
  );
}

export default TasksList;
