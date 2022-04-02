import React, { useState, ChangeEvent } from "react";
import { taskApi } from "../../../service/taskService";
import { Button, Input } from "../../BaseComponent";
import s from "../Home.module.scss";
interface UpDateTaskProps {
  setUpDateTask: (bol: boolean) => void;
  upDateTask: boolean;
  upDateTaskId: number | null;
}

export default function UpDateTask({
  setUpDateTask,
  upDateTask,
  upDateTaskId,
}: UpDateTaskProps): JSX.Element {
  const [upDateText, setUpDateText] = useState<string>("");

  const [upDateTaskHook, { error: upDateErrorTask, isLoading: upDateLoading }] =
    taskApi.useUpdateTaskMutation();

  const handlerUpDateText = (e: ChangeEvent<HTMLInputElement>) => {
    setUpDateText(e.target.value);
  };

  const submitUpDateTask = () => {
    if (upDateTaskId) upDateTaskHook({ id: +upDateTaskId, text: upDateText });
    setUpDateTask(false);
  };

  // eslint-disable-next-line no-console
  if (upDateErrorTask) console.log("UpDateErrorTask", upDateErrorTask);
  return (
    <div
      style={{ display: upDateTask ? "block" : "none" }}
      className={s.tasks_list_item_update_input}
    >
      <Input value={upDateText} onChange={handlerUpDateText} placeholder="Новая задача" />
      <Button onClick={submitUpDateTask}>Изменить</Button>
    </div>
  );
}
