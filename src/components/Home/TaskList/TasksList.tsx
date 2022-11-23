import React, { useEffect, useMemo, useState, memo } from "react";
import { categoriesApi } from "../../../service/categoriesService";
import { DataTypeTasks, Task } from "../../../types/TypeTask";
import { useLengthTimeLine } from "../../../hooks/useLengthTimeLine";
import { ICategories } from "../../../types/TypeCategories";
import { v4 as uuidv4 } from "uuid";
import TaskItem from "../Item/TaskItem";
import Spinner from "../../UI/Loaders/LoaderSpinner";
import TimeLine from "../../TimeLine/TimeLine";
import LongList from "./LongList";
import ShortList from "./ShortList";
import ChangeLengthListBtn from "./ChangeLengthListBtn";
import s from "../Home.module.scss";

interface ITasksListProps {
  userId: number;
  tasks?: DataTypeTasks[];
  getTaskError: unknown;
  loadingTasks: boolean;
}

function TasksList({ userId, tasks, getTaskError, loadingTasks }: ITasksListProps): JSX.Element {
  const { data: categories, error: getCategoriesError } =
    categoriesApi.useGetCategoriesQuery(userId);

  const { length, setLength } = useLengthTimeLine();
  const [lengthLineValue, setLengthLineValue] = useState<string>("");
  const [mobile, setMobile] = useState(false);
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

  // eslint-disable-next-line no-console
  if (getCategoriesError) console.log("TaskList.tsx file", getCategoriesError);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 576px)");
    const mediaQueryFunc = () => setMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", mediaQueryFunc);
    if (mediaQuery.matches) setMobile(true);
    return () => removeEventListener("change", mediaQueryFunc);
  }, []);

  return (
    <section className={s.tasks_for_day}>
      <TimeLine hours={hours} lengthLineValue={lengthLineValue} />
      <ChangeLengthListBtn setLengthLine={setLengthLine} lengthLineValue={lengthLineValue} />
      {getTaskError ? getTaskError : ""}
      <ul className={s.tasks_list}>
        {loadingTasks ? (
          <Spinner message="Загрузка..." />
        ) : (
          <>
            {!mobile ? (
              <>
                {lengthLineValue === "all" ? (
                  <LongList categories={categories} hours={hours} />
                ) : (
                  <ShortList categories={categories} hours={hours} />
                )}
              </>
            ) : (
              <>
                {tasks ? (
                  <>
                    {tasks[0]?.taskDate?.map((el: Task) => {
                      const category = categories?.find(
                        (v: ICategories) => v.id === el.categoriesID
                      );

                      return (
                        <TaskItem
                          id={el.id}
                          key={uuidv4()}
                          status={el.status}
                          time={`${el.time}`}
                          task={el.text}
                          color={category?.color}
                        />
                      );
                    })}
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </>
        )}
      </ul>
    </section>
  );
}

export default memo(TasksList);
