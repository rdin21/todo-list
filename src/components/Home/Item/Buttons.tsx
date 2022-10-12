import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { taskApi } from "../../../service/taskService";
import s from "../Home.module.scss";
import { Button } from "../../BaseComponent";
import { categoriesApi } from "../../../service/categoriesService";
interface ItemButtonsProps {
  status: null | boolean;
  upDate: (id: number) => void;
  id: number;
}

export default function ItemButtons({ status, upDate, id }: ItemButtonsProps): JSX.Element {
  const currentDate = new Date().toLocaleDateString();
  const updateCategory = categoriesApi.endpoints.getAllCategoriesAndTask.useQuery(currentDate);
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

  const deleteTask = () => {
    deleteTaskHook(id).then(() => updateCategory.refetch());
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
      <Button name="Готово" onClick={upDateStatusTrue}>
        <FontAwesomeIcon icon={faCheck} color="green" title="Готово" />
      </Button>
      <Button name="edit">
        <FontAwesomeIcon
          icon={faPencilAlt}
          title="Редактировать"
          onClick={() => upDate(id)}
          color="white"
        />
      </Button>
      <Button
        name="Провал"
        onClick={upDateStatusFalse}
        style={{ fontSize: "20px", color: "white" }}
        title="Провал"
      >
        &times;
      </Button>
      <Button name="Удалить" onClick={deleteTask}>
        <FontAwesomeIcon icon={faTrashAlt} color="red" title="Удалить" />
      </Button>
    </div>
  );
}
