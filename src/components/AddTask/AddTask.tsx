import "./AddTask.scss";
import { FC, useState, ChangeEvent } from "react";
import { useAppSelector } from "../../hooks/redux";
import { CreateTask } from "../../types/TypeTask";
import { TUserFromAccessToken } from "../../types/TypeUser";
import { selectUser } from "../../store/selectors";
import { taskApi } from "../../service/taskService";

import { formatDate } from "../../utils/utils";
import { Input, Button } from "../BaseComponent";
import CategoriesList from "../Categories/CategoriesList";

const AddTask: FC = () => {
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

  const [task, setTask] = useState<CreateTask>({
    text: "",
    date: "",
    time: "",
    status: null,
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

  const onClickColor = (id: number) => setTask({ ...task, categoriesID: id });
  const clickSetTask = (): void => {
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
    clickSetTask();
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
          <CategoriesList
            onClick={onClickColor}
            classNameList="delete-list"
            classNameItem="list-item"
            classNameIcon="list-item-delete-icon"
          />
        </ul>
      </div>

      <div className="create-buttons">
        <Button className="create-buttons-btn" onClick={clickSetTask}>
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
