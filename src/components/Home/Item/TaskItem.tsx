import { useState } from "react";
import Buttons from "./Buttons";
import Status from "./Status";
import UpDate from "./UpDate";
import s from "./Item.module.scss";
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
      <span>{time}</span>

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
      <Buttons id={id} status={status} upDate={upDate} />
    </li>
  );
}
