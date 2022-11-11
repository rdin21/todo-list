import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import s from "./Home.module.scss";

interface IAddTaskBtn {
  setCreateTask: (bool: boolean) => void;
}

function AddTaskBtn({ setCreateTask }: IAddTaskBtn): JSX.Element {
  const handleOpen = () => {
    setCreateTask(true);
  };
  return (
    <div className={s.home_add_task_btn} title="Добавить задачу" onClick={handleOpen}>
      <FontAwesomeIcon className={s.home_add_task_btn_icon} icon={faPlus} />
    </div>
  );
}

export default memo(AddTaskBtn);
