import { useState, ChangeEvent } from "react";
import { useAppSelector } from "../../hooks/redux";
import { TUserFromAccessToken } from "../../types/TypeUser";
import { taskApi } from "../../service/taskService";
import { formatDate } from "../../utils/utils";
import { Input, Button } from "../UI/BaseComponent";
import { IDateTask } from "./Types";
import { categoriesApi } from "../../service/categoriesService";
import ErrorMessage from "../UI/Error/ErrorMessage";
import CategoriesList from "../Categories/CategoriesList";
import DateInputs from "./DateInputs";
import s from "./AddTask.module.scss";

interface AddTaskProps {
  onCloseModal: () => void;
}

function AddTask({ onCloseModal }: AddTaskProps): JSX.Element {
  const currentDate = new Date().toLocaleDateString();
  const { data } = useAppSelector((s) => s.user);
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
  const [validateError, setValidateError] = useState<string>("");
  const [info, setInfo] = useState({
    status: null,
    categoriesID: 0,
  });

  const onChangeTask = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };
  const onClickColor = (id: number): void => setInfo({ ...info, categoriesID: id });
  // eslint-disable-next-line consistent-return
  const createdTask = (): void | "" => {
    setValidateError("");
    const { status, categoriesID } = info;

    if (text.length === 0) {
      return setValidateError("Длина задачи должна быть больше 0");
    }
    if (date === "" || time.hour === "" || time.minute === "") {
      return setValidateError("Дата или время не установлены");
    }
    if (!categoriesID) {
      return setValidateError("Комната не выбрана");
    }
    const resultDate = date.split("-").reverse().join(".");
    const task = {
      text,
      date: resultDate,
      time: `${time.hour}:${time.minute}`,
      status,
      categoriesID,
      taskDateId: dateData?.id,
      userId: +user.id,
    };
    createTask(task).then(() => {
      onCloseModal();
      updateCategory.refetch();
    });
  };

  // eslint-disable-next-line no-console
  if (dateError) console.error("AddTask.tsx file", dateError);

  return (
    <div className={s.add_tasks}>
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

      {createTaskError ? <ErrorMessage message={createTaskError} /> : ""}
      {validateError ? <ErrorMessage message={validateError} /> : ""}
      <Button className={s.create_btn} onClick={createdTask} isLoading={loadingTask}>
        Создать
      </Button>
    </div>
  );
}

export default AddTask;
