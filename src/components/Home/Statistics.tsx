import React, { memo } from "react";
import ProgressCircle from "./ProgressCircle/ProgressCircle";
import ProgressColumn from "./ProgressColumn/ProgressColumn";
import s from "./Home.module.scss";
import { DataTypeTasks } from "../../types/TypeTask";

interface IStatisticsProps {
  tasks?: DataTypeTasks[];
  getTaskError: unknown;
  loadingTasks: boolean;
}

function Statistics({ tasks, getTaskError, loadingTasks }: IStatisticsProps): JSX.Element {
  return (
    <div className={s.progress}>
      <ProgressCircle tasks={tasks} getTaskError={getTaskError} loadingTasks={loadingTasks} />
      <ProgressColumn />
    </div>
  );
}

export default memo(Statistics);
