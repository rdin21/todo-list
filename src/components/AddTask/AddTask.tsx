import "./AddTask.scss";
import { FC, useState, ChangeEvent, MouseEvent } from "react";
import { useAppSelector } from "../../hooks/redux";
import { CreateTask } from "../../types/TypeTask";
import { TUserFromAccessToken } from "../../types/TypeUser";
import { categoriesApi } from "../../service/categoriesService";
import { selectUser } from "../../store/selectors";
import { taskApi } from "../../service/taskService";
import { TCreateCategories } from "../../types/TypeCategories";
import Preloader2 from "../Preloader/Preloader2";
import { formatDate } from "../../utils/utils";
import { Input, Button } from "../BaseComponent";

const AddTask: FC = () => {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error,
  } = categoriesApi.useGetCategoriesQuery(10);
  const { data } = useAppSelector(selectUser);
  const {
    data: dateData,
    // , error: dateError
  } = taskApi.useCheckCreateDateQuery(formatDate);

  const [
    createTask,
    // , { error: createTaskError, isLoading: loadingTaskError }
  ] = taskApi.useCreateTaskMutation();
  const user = data as TUserFromAccessToken;
  let errorsMessages = null;
  if (error) {
    if ("data" in error) {
      if ("message" in error.data) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorsMessages = error.data.message;
      }
      if (Array.isArray(error.data)) errorsMessages = error.data;
    }
  }
  const [task, setTask] = useState<CreateTask>({
    text: "",
    date: "",
    time: "",
    status: false,
    categoriesID: 0,
    taskDateId: 0,
    userId: 0,
  });

  const [time, setTime] = useState({
    hour: "",
    minute: "",
  });
  const onChangeTask = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const onChangeHour = (e: ChangeEvent<HTMLInputElement>) =>
    setTime({ ...time, hour: e.target.value });
  const onChangeMinute = (e: ChangeEvent<HTMLInputElement>) =>
    setTime({ ...time, minute: e.target.value });

  const onClickColor = (e: MouseEvent) => {
    const categoryName = e.currentTarget.innerHTML;
    const categoryId = categories?.find((category) => category.name === categoryName);
    setTask({ ...task, categoriesID: categoryId?.id });
  };
  const clicksetTask = (): void => {
    const userId = user.id;
    const resultDate = task.date.split("-").reverse().join(".");
    setTask({
      ...task,
      userId,
      time: `${time.hour}:${time.minute}`,
      taskDateId: dateData?.id,
      date: resultDate,
    });
  };
  const createdTask = (): void => {
    createTask(task);
  };
  return (
    <div className="add-tasks">
      <h4>Create task</h4>

      <Input
        className="add-tasks-text"
        type="text"
        name="text"
        placeholder="add task"
        onChange={onChangeTask}
        value={task.text}
      />
      <div className="data-input-group">
        <Input
          type="date"
          name="date"
          onChange={onChangeTask}
          className="data-input-group-date"
          value={task.date}
        />

        <span className="data-input-group-separator">-</span>
        <div className="data-input-group-time">
          <Input
            type="number"
            placeholder="hour"
            name="time"
            onChange={onChangeHour}
            value={time.hour}
          />

          <span>:</span>
          <Input
            type="number"
            placeholder="minute"
            name="time"
            onChange={onChangeMinute}
            value={time.minute}
          />
        </div>
      </div>

      <div>
        <h4>Categories</h4>
        <ul className="categories-buttons-list">
          {isLoadingCategories ? (
            <Preloader2 />
          ) : (
            <>
              {categories?.map(
                (elem: TCreateCategories): JSX.Element => (
                  // <button
                  //   key={elem.name}
                  //   className={`categories-buttons color-${elem.color}`}
                  //   onClick={onClickColor}
                  // >
                  //   {elem.name}
                  // </button>
                  <li key={elem.name}>
                    <Button
                      className={`categories-buttons color-${elem.color}`}
                      onClick={onClickColor}
                    >
                      {elem.name}
                    </Button>
                  </li>
                )
              )}
            </>
          )}
          {errorsMessages ? errorsMessages : ""}
        </ul>
      </div>

      <div className="create-buttons">
        <Button className="create-buttons-btn" onClick={clicksetTask}>
          set task
        </Button>
        <Button className="create-buttons-btn" onClick={createdTask}>
          Created task
        </Button>
      </div>
    </div>
  );
};

export default AddTask;
