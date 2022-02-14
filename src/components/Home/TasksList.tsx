import { categoriesApi } from "../../service/categoriesService";
import { taskApi } from "../../service/taskService";
import { formatDate } from "../../utils/utils";
import { DataTypeTasks, Task } from "../../types/TypeTask";
import TaskItem from "./TaskItem";
const TasksList = () => {
  const {
    data: tasks,
    // error: getTaskError,
    // isLoading: getTaskLoading,
  } = taskApi.useGetTaskQuery(formatDate);

  const {
    data: categories,
    // error: getCategoriesError,
    // isLoading: getCategoriesLoading,
  } = categoriesApi.useGetCategoriesQuery(10);
  return (
    <section className="tasks_for_day">
      <h3>Tasks for today</h3>
      <ul className="tasks__list">
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
                  category={category?.name}
                  color={category?.color}
                />
              );
            });
          })
        ) : (
          <h1>Not tasks</h1>
        )}
      </ul>
    </section>
  );
};

export default TasksList;