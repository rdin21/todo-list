import React, { useState, ChangeEvent } from "react";
import { taskApi } from "../../../service/taskService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from "../../UI/BaseComponent";
import s from "./Item.module.scss";
interface UpDateTaskProps {
  setUpDateTask: (bol: boolean) => void;
  upDateTask: boolean;
  upDateTaskId: number | null;
  task: string;
}

export default function UpDateTask({
  setUpDateTask,
  upDateTask,
  upDateTaskId,
  task,
}: UpDateTaskProps): JSX.Element {
  const [upDateText, setUpDateText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [upDateTaskHook, { error, isLoading }] = taskApi.useUpdateTaskMutation();

  const handlerUpDateText = (e: ChangeEvent<HTMLInputElement>): void => {
    setUpDateText(e.target.value);
  };

  // eslint-disable-next-line consistent-return
  const submitUpDateTask = (): void | string => {
    if (upDateText.length < 2) {
      return setErrorMessage("Новая задача меньше 2 символов");
    } else {
      if (upDateTaskId) upDateTaskHook({ id: +upDateTaskId, text: upDateText });
      setUpDateTask(false);
    }
  };

  // eslint-disable-next-line no-console
  if (error) console.log("UpDate.tsx file", error);

  return (
    <div style={{ display: upDateTask ? "inline-flex" : "none" }} className={s.update_input}>
      <Input
        value={upDateText}
        onChange={handlerUpDateText}
        placeholder={errorMessage ? errorMessage : task}
        className={s.update_input_inp}
      />
      <Button
        onClick={submitUpDateTask}
        title="Обновить"
        disabled={isLoading}
        className={s.update_input_btn}
      >
        <FontAwesomeIcon icon={faCheck} color="green" />
      </Button>
    </div>
  );
}
