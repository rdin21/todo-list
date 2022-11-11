import { DataTypeTasks } from "../../../types/TypeTask";
import { taskApi } from "../../../service/taskService";
import { formatDate } from "../../../utils/utils";
import useProgressCircle from "../../../hooks/useProgressCircle";
import Spinner from "../../UI/Loaders/LoaderSpinner";
import Info from "./Info";
import Circle from "./Circle";
import s from "./ProgressCircle.module.scss";

export default function ProgressCircle(): JSX.Element {
  const { data, isLoading, error } = taskApi.useGetTaskQuery(formatDate);

  const tasks = data as DataTypeTasks[];
  const [ready, notReady] = useProgressCircle(tasks);

  // eslint-disable-next-line no-console
  if (error) console.error("ProgressCircle.tsx", error);
  return (
    <section className={s.progress}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {error ? (
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
