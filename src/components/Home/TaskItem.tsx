import { ChangeEvent, FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { taskApi } from "../../service/taskService";
import Input from "../BaseComponent/Input";
type TasksItemProps = {
  id: number;
  status: boolean;
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

  const upDate = () => {
    setUpDateTask(true);
  };
  const handlerUpDateText = (e: ChangeEvent<HTMLInputElement>) => {
    setUpDateText(e.target.value);
  };
  const [
    deleteTask,
    // , { error: deleteErrorTask, isLoading: deleteLoading }
  ] = taskApi.useDeleteTaskMutation();

  // const [upDateTask, { error: upDateErrorTask, isLoading: upDateLoading }] =
  //   taskApi.useUpdateTaskMutation();

  const [
    updateStatus,
    // { error: upDateStatusError, isLoading: upDateStatusLoading },
  ] = taskApi.useUpdateStatusTaskMutation();
  // const [checkData] = taskApi.useLazyGetTaskQuery();
  const upDateStatus = () => {
    updateStatus({
      id,
      status: !status,
    });
    // checkData(formatDate);
  };

  return (
    <li
      className="tasks__list-item"
      style={{
        boxShadow: `${status ? "green" : color} 2px 3px 5px 0px`,
      }}
    >
      <span>
        {time}
        <br />
        {/* {status ? "true" : "false"} */}
      </span>
      <div className="tasks__list-item-current-tasks" style={{ opacity: status ? "0.2" : "1" }}>
        {task}
      </div>
      <div className="ready" style={{ visibility: status ? "inherit" : "hidden" }}>
        Выполнено
      </div>
      <div style={{ display: upDateTask ? "block" : "none" }}>
        <Input value={upDateText} onChange={handlerUpDateText} />
      </div>
      <div className="tasks__list-item-buttons">
        <button name="check" onClick={upDateStatus}>
          <FontAwesomeIcon icon={faCheck} color="green" title="Check" />
        </button>
        <button name="edit">
          <FontAwesomeIcon icon={faPencilAlt} title="Edit" onClick={upDate} />
        </button>
        <button name="delete" onClick={() => deleteTask(id)}>
          <FontAwesomeIcon icon={faTrashAlt} color="red" title="Delete" />
        </button>
        <div className={`circle color-${color}`}></div>
      </div>
    </li>
  );
};

export default TimeLineItem;
