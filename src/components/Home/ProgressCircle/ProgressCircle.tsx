import React from "react";
import useProgressCircle from "../../../hooks/useProgressCircle";
import Spinner from "../../UI/Loaders/LoaderSpinner";
import Info from "./Info";
import Circle from "./Circle";
import s from "./ProgressCircle.module.scss";
import { DataTypeTasks } from "../../../types/TypeTask";
interface IProgressCircleProps {
  tasks?: DataTypeTasks[];
  getTaskError: unknown;
  loadingTasks: boolean;
}
export default function ProgressCircle({
  tasks,
  getTaskError,
  loadingTasks,
}: IProgressCircleProps): JSX.Element {
  const [ready, notReady] = useProgressCircle(tasks);

  // eslint-disable-next-line no-console
  if (getTaskError) console.error("ProgressCircle.tsx", getTaskError);
  return (
    <section className={s.progress}>
      {loadingTasks ? (
        <Spinner />
      ) : (
        <>
          {getTaskError ? (
            <b className="error-message">Не удалось загрузить компонент </b>
          ) : (
            <>
              <Circle ready={ready} notReady={notReady} />
              <Info ready={ready} notReady={notReady} />
            </>
          )}
        </>
      )}
    </section>
  );
}
