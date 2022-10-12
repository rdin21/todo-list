import { useState, ChangeEvent } from "react";
import { useAppSelector } from "../../hooks/redux";
import { TUserFromAccessToken } from "../../types/TypeUser";
import { selectUser } from "../../store/selectors";
import { taskApi } from "../../service/taskService";

import { formatDate } from "../../utils/utils";
import { Input, Button } from "../BaseComponent";
import CategoriesList from "../Categories/CategoriesList";
import DateInputs from "./DateInputs";
import s from "./AddTask.module.scss";
import { IDateTask } from "./Types";
import { categoriesApi } from "../../service/categoriesService";

interface AddTaskProps {
  onCloseModal: () => void;
}

function AddTask({ onCloseModal }: AddTaskProps): JSX.Element {
  const currentDate = new Date().toLocaleDateString();
  const { data } = useAppSelector(selectUser);
  const { data: dateData, error: dateError } = taskApi.useCheckCreateDateQuery(formatDate);
  const [createTask, { error: createTaskError, isLoading: loadingTask }] =
    taskApi.useCreateTaskMutation();
  const updateCategory = categoriesApi.endpoints.getAllCategoriesAndTask.useQuery(currentDate);
  const user = data as TUserFromAccessToken;
  const [text, setText] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<IDateTask>({
    hour: "",
    minute: "",
  });

  const [info, setInfo] = useState({
    status: null,
    categoriesID: 0,
  });

  const onChangeTask = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };
  const onClickColor = (id: number) => setInfo({ ...info, categoriesID: id });
  const createdTask = () => {
    const { status, categoriesID } = info;
    const resultDate = date.split("-").reverse().join(".");
    const task = {
      text,
      date: resultDate,
      time: `${time.hour}:${time.minute}`,
      status,
      categoriesID,
      taskDateId: dateData?.id,
      userId: user.id,
    };
    createTask(task).then(() => {
      onCloseModal();
      updateCategory.refetch();
    });
  };

  // eslint-disable-next-line no-console
  if (dateError) console.log("AadTaskDateError", dateError);
  // eslint-disable-next-line no-console
  if (createTaskError) console.log("CreateTaskError", createTaskError);

  return (
    <div className={s.add_tasks}>
      <h1>Создать задачу</h1>

      <Input
        className={s.add_tasks_text}
        type="text"
        name="text"
        placeholder="Добавить задачу"
        onChange={onChangeTask}
        value={text}
      />

      <DateInputs date={date} setDate={setDate} time={time} setTime={setTime} />
      <div>
        <CategoriesList
          onClick={onClickColor}
          classNameList={s.delete_list}
          classNameItem={s.list_item}
          classNameIcon={s.list_item_delete_icon}
        />
      </div>

      <Button className={s.create_btn} onClick={createdTask} isLoading={loadingTask}>
        Создать
      </Button>
    </div>
  );
}

export default AddTask;
