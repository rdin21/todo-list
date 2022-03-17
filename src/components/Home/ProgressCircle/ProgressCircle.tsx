import s from "./ProgressCircle.module.scss";
import { DataTypeTasks } from "../../../types/TypeTask";
import { taskApi } from "../../../service/taskService";
import useProgressCircle from "../../../hooks/useProgressCircle";
import Preloader2 from "../../Preloader/Loading";
import { formatDate } from "../../../utils/utils";
import Info from "./Info";
import Circle from "./Circle";

export default function ProgressCircle(): JSX.Element {
  const { data, isLoading, error } = taskApi.useGetTaskQuery(formatDate);

  const tasks = data as DataTypeTasks[];
  const [ready, notReady] = useProgressCircle(tasks);

  // eslint-disable-next-line no-console
  if (error) console.log("ProgressCircleError", error);

  return (
    <section className={s.progress}>
      {isLoading ? (
        <Preloader2 />
      ) : (
        <>
          <Circle ready={ready} notReady={notReady} />
          <Info ready={ready} notReady={notReady} />
          {error ? <b className="error-message">Не удалось загрузить компонент </b> : <></>}
        </>
      )}
    </section>
  );
}
