import React, { memo } from "react";
import { Button } from "../UI/BaseComponent";
import s from "./AddTask.module.scss";
interface AddTaskBtnProps {
  createdTask: () => void | "";
  loadingTask: boolean;
}

function AddTaskBtn({ createdTask, loadingTask }: AddTaskBtnProps): JSX.Element {
  return (
    <Button className={s.create_btn} onClick={createdTask} isLoading={loadingTask}>
      Создать
    </Button>
  );
}

export default memo(AddTaskBtn);
