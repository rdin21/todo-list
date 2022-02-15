import "./ProgressCircle.scss";
import { DataTypeTasks } from "../../../types/TypeTask";
import { taskApi } from "../../../service/taskService";
import useProgressCircle from "../../../hooks/useProgressCircle";
import Preloader2 from "../../Preloader/Preloader2";

const ProgressCircle = (): JSX.Element => {
  const date = new Date().toLocaleString().split(",")[0];
  const formatDate = date.split(".").join("_");
  const { data, isLoading, error } = taskApi.useGetTaskQuery(formatDate);
  if (error) {
    // eslint-disable-next-line no-console
    console.log("ProgressCircleError", error);
  }
  const tasks = data as DataTypeTasks[];
  const [ready, notReady] = useProgressCircle(tasks);
  return (
    <section className="progress_circle">
      {isLoading ? (
        <Preloader2 />
      ) : (
        <>
          <svg className="chart" width="150" height="150" viewBox="0 0 50 50">
            <circle
              style={{ strokeDasharray: `${ready} 100` }}
              className="unit"
              r="15.9"
              cx="50%"
              cy="50%"
            ></circle>
            <circle
              style={{
                strokeDasharray: `${notReady} 100`,
                strokeDashoffset: -ready,
              }}
              className="unit"
              r="15.9"
              cx="50%"
              cy="50%"
            ></circle>
          </svg>
          <div className="legend">
            <ul className="caption-list">
              <li className="caption-item">
                <div className="percentage-progress green">{Math.round(ready) + "%"}</div>Ready
              </li>
              <li className="caption-item ">
                <div className="percentage-progress red">{Math.round(notReady) + "%"}</div>Not done
              </li>
            </ul>
          </div>
        </>
      )}
    </section>
  );
};

export default ProgressCircle;
