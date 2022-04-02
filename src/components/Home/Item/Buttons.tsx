import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { taskApi } from "../../../service/taskService";
import s from "../Home.module.scss";
import classNames from "classnames";
interface ItemButtonsProps {
  status: null | boolean;
  upDate: (id: number) => void;
  color: string;
  id: number;
}

export default function ItemButtons({ status, upDate, color, id }: ItemButtonsProps): JSX.Element {
  const [deleteTaskHook, { error: deleteErrorTask }] = taskApi.useDeleteTaskMutation();
  const [setStatusTrueHook, { error: upDateStatusTrueError }] = taskApi.useSetStatusTrueMutation();
  const [setStatusFalseHook, { error: upDateStatusFalseError }] =
    taskApi.useSetStatusFalseMutation();

  const upDateStatusTrue = () => {
    setStatusTrueHook({
      id,
      status: true,
    });
  };

  const upDateStatusFalse = () => {
    setStatusFalseHook({
      id,
      status: false,
    });
  };

  // eslint-disable-next-line no-console
  if (upDateStatusTrueError) console.log("UpDateStatusErrorTask", upDateStatusTrueError);
  // eslint-disable-next-line no-console
  if (upDateStatusFalseError) console.log("upDateStatusFalseError", upDateStatusFalseError);
  // eslint-disable-next-line no-console
  if (deleteErrorTask) console.log("DeleteErrorTask", deleteErrorTask);

  return (
    <div
      className={s.tasks_list_item_buttons}
      style={{
        opacity: status !== null ? "0.5" : "1",
        pointerEvents: status !== null ? "none" : "inherit",
      }}
    >
      <button name="check" onClick={upDateStatusTrue}>
        <FontAwesomeIcon icon={faCheck} color="green" title="Готово" />
      </button>
      <button name="edit">
        <FontAwesomeIcon icon={faPencilAlt} title="Редактировать" onClick={() => upDate(id)} />
      </button>
      <button name="fail" onClick={upDateStatusFalse} style={{ fontSize: "20px" }} title="Провал">
        &times;
      </button>
      <button name="delete" onClick={() => deleteTaskHook(id)}>
        <FontAwesomeIcon icon={faTrashAlt} color="red" title="Удалить" />
      </button>
    </div>
  );
}
