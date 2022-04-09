import { categoriesApi } from "../../service/categoriesService";
import { taskApi } from "../../service/taskService";
import { formatDate } from "../../utils/utils";
import { Task } from "../../types/TypeTask";
import TaskItem from "./Item/TaskItem";
import s from "./Home.module.scss";
import { useMemo, useState } from "react";
import Loading from "../Preloader/Loading";

export default function TasksList(): JSX.Element {
  const {
    data: tasks,
    error: getTaskError,
    isLoading: loadingTasks,
  } = taskApi.useGetTaskQuery(formatDate);
  const { data: categories, error: getCategoriesError } = categoriesApi.useGetCategoriesQuery(10);
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);

  // eslint-disable-next-line no-console
  if (getTaskError) console.log("getTaskError", getTaskError);
  // eslint-disable-next-line no-console
  if (getCategoriesError) console.log("DeleteErrorTask", getCategoriesError);

  useMemo(() => {
    const sortedTasks: Task[] | any = [];
    if (tasks && tasks?.length > 0) {
      sortedTasks.push(...tasks[0]?.taskDate);
    }
    sortedTasks.sort((a: Task, b: Task): number => {
      const date1 = a.time.split(":").join("");
      const date2 = b.time.split(":").join("");
      return Number(date1) - Number(date2);
    });
    setSortedTasks(sortedTasks);
  }, [tasks]);

  return (
    <section className={s.tasks_for_day}>
      <h3>Задачи на сегодня</h3>
      <ul className={s.tasks_list}>
        {loadingTasks ? (
          <Loading />
        ) : (
          <>
            {tasks !== undefined && tasks.length !== 0 ? (
              sortedTasks.map((task: Task) => {
                const category = categories?.find((v) => v.id === task.categoriesID);
                return (
                  <TaskItem
                    id={task.id}
                    key={`${task.date}$${task.time}`}
                    status={task.status}
                    time={`${task.time}`}
                    task={task.text}
                    color={category?.color}
                  />
                );
              })
            ) : (
              <div className={s.not_task}>
                <h4 className={s.not_task_title}>На сегодняшний день нет задач</h4>
              </div>
            )}
          </>
        )}
      </ul>
    </section>
  );
}
