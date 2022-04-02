import { categoriesApi } from "../../service/categoriesService";
import { taskApi } from "../../service/taskService";
import { formatDate } from "../../utils/utils";
import { DataTypeTasks, Task } from "../../types/TypeTask";
import TaskItem from "./Item/TaskItem";
import s from "./Home.module.scss";

export default function TasksList(): JSX.Element {
  const { data: tasks, error: getTaskError } = taskApi.useGetTaskQuery(formatDate);
  const { data: categories, error: getCategoriesError } = categoriesApi.useGetCategoriesQuery(10);

  // eslint-disable-next-line no-console
  if (getTaskError) console.log("getTaskError", getTaskError);
  // eslint-disable-next-line no-console
  if (getCategoriesError) console.log("DeleteErrorTask", getCategoriesError);

  return (
    <section className={s.tasks_for_day}>
      <h3>Задачи на сегодня</h3>
      <ul className={s.tasks_list}>
        {tasks !== undefined && tasks.length !== 0 ? (
          tasks?.map((date: DataTypeTasks) => {
            return date?.taskDate.map((task: Task) => {
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
            });
          })
        ) : (
          <div className={s.not_task}>
            <h4 className={s.not_task_title}>На сегодняшний день нет задач</h4>
          </div>
        )}
      </ul>
    </section>
  );
}
