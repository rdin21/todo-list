import { useState } from "react";
import Buttons from "./Buttons";
import Status from "./Status";
import UpDate from "./UpDate";
import s from "./Item.module.scss";
import { Button } from "../../UI/BaseComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
type TasksItemProps = {
  id: number;
  status: boolean | null;
  time: string;
  task: string;
  color?: string;
};

export default function TimeLineItem({
  id,
  time,
  task,
  color,
  status,
}: TasksItemProps): JSX.Element {
  const [upDateTask, setUpDateTask] = useState<boolean>(false);
  const [upDateTaskId, setUpDateTaskId] = useState<number | null>(null);

  const upDate = (id: number) => {
    setUpDateTask(true);
    setUpDateTaskId(id);
  };

  const trueAndFalseColor = status ? "green" : "red";
  return (
    <li className={s.item}>
      <div
        className={s.item_circle}
        style={{
          background: status !== null ? trueAndFalseColor : color,
        }}
      ></div>
      <span className={s.item_time}>{time}</span>

      <div
        className={s.item_current_tasks}
        style={{ opacity: status !== null ? "0.5" : "1", display: upDateTask ? "none" : "block" }}
      >
        {task}
      </div>
      <Status status={status} />
      <UpDate
        upDateTask={upDateTask}
        upDateTaskId={upDateTaskId}
        setUpDateTask={setUpDateTask}
        task={task}
      />
      <div className={s.item_block}>
        <Buttons id={id} status={status} upDate={upDate} />
      </div>
      <div className={s.mobile_menu}>
        <Button name="ellipsis_vertical" className={s.mobile_menu_ellipsis_v}>
          <FontAwesomeIcon
            icon={faEllipsisV}
            title="Открыть"
            className={s.mobile_menu_ellipsis_v_icon}
            // onClick={() => upDate(id)}
            color={"red"}
          />
        </Button>
        <div className={s.menu}>
          <Buttons id={id} status={status} upDate={upDate} />
        </div>
      </div>
    </li>
  );
}
