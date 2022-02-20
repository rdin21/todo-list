import { ChangeEvent, FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { taskApi } from "../../service/taskService";
import Input from "../BaseComponent/Input";
import { Button } from "../BaseComponent";
type TasksItemProps = {
  id: number;
  status: boolean | null;
  time: string;
  task: string;
  category?: string;
  color?: string;
};

const TimeLineItem: FC<TasksItemProps> = ({
  id,
  time,
  task,
  // category,
  color,
  status,
}) => {
  const [upDateTask, setUpDateTask] = useState<boolean>(false);
  const [upDateText, setUpDateText] = useState<string>("");
  const [upDateTaskId, setUpDateTaskId] = useState<number | null>(null);

  const upDate = (id: number) => {
    setUpDateTask(true);
    setUpDateTaskId(id);
  };
  const handlerUpDateText = (e: ChangeEvent<HTMLInputElement>) => {
    setUpDateText(e.target.value);
  };
  const [deleteTaskHook, { error: deleteErrorTask, isLoading: deleteLoading }] =
    taskApi.useDeleteTaskMutation();

  const [upDateTaskHook, { error: upDateErrorTask, isLoading: upDateLoading }] =
    taskApi.useUpdateTaskMutation();

  const [setStatusTrue, { error: upDateStatusTrueError, isLoading: upDateStatusTrueLoading }] =
    taskApi.useSetStatusTrueMutation();
  const upDateStatusTrue = () => {
    setStatusTrue({
      id,
      status: true,
    });
  };

  const [setStatusFalse, { error: upDateStatusFalseError, isLoading: upDateStatusFalseLoading }] =
    taskApi.useSetStatusFalseMutation();
  const upDateStatusFalse = () => {
    setStatusFalse({
      id,
      status: false,
    });
  };

  const submitUpDateTask = () => {
    if (upDateTaskId) upDateTaskHook({ id: +upDateTaskId, text: upDateText });
    setUpDateTask(false);
  };

  // eslint-disable-next-line no-console
  if (deleteErrorTask) console.log("DeleteErrorTask", deleteErrorTask);
  // eslint-disable-next-line no-console
  if (upDateErrorTask) console.log("UpDateErrorTask", upDateErrorTask);
  // eslint-disable-next-line no-console
  if (upDateStatusTrueError) console.log("UpDateStatusErrorTask", upDateStatusTrueError);
  // eslint-disable-next-line no-console
  if (upDateStatusTrueError) console.log("UpDateStatusErrorTask", upDateStatusTrueError);
  const trueAndFalseColor = status ? "green" : "red";
  return (
    <li
      className="tasks-list-item"
      style={{
        boxShadow: `${status !== null ? trueAndFalseColor : color} 2px 3px 5px 0px`,
      }}
    >
      <span>
        {time}
        <br />
        {/* {status ? "true" : "false"} */}
      </span>
      <div
        className="tasks-list-item-current-tasks"
        style={{ opacity: status !== null ? "0.5" : "1", display: upDateTask ? "none" : "block" }}
      >
        {task}
      </div>
      <div
        className="ready"
        style={{ visibility: status === null ? "hidden" : status ? "inherit" : "hidden" }}
      >
        <FontAwesomeIcon icon={faCheck} />
      </div>
      <div
        className="not-ready"
        style={{ visibility: status === null ? "hidden" : status ? "hidden" : "inherit" }}
      >
        &times;
      </div>
      <div
        style={{ display: upDateTask ? "block" : "none" }}
        className="tasks-list-item-update-input"
      >
        <Input value={upDateText} onChange={handlerUpDateText} placeholder="Новая задача" />
        <Button onClick={submitUpDateTask}>Изменить</Button>
      </div>
      <div
        className="tasks-list-item-buttons"
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

        <div className={`circle color-${color}`}></div>
      </div>
    </li>
  );
};

export default TimeLineItem;
