import "./ProgressCircle.scss";
import { useEffect, useState } from "react";
import { DataTypeTasks } from "../../../types/TypeTask";
import { taskApi } from "../../../service/taskService";

const ProgressCircle = () => {
  const date = new Date().toLocaleString().split(",")[0];
  const formatDate = date.split(".").join("_");
  const {
    data,
    // , isLoading, error
  } = taskApi.useGetTaskQuery(formatDate);

  const tasks = data as DataTypeTasks[];
  const [ready, setReady] = useState(0);
  const [notReady, setNotReady] = useState(100);
  // let tr = 0;
  // let fl = 0;
  // if (tasks) {
  //   let tr = 0;
  //   let fl = 0;
  //   console.log(tasks[0].taskDate);
  //   tasks[0].taskDate?.forEach((el) => {
  //     el.status ? tr++ : fl++;
  //   });
  //   // setSumTrueValue(tr);
  //   // setSumFalseValue(fl);
  // }
  // let sum = tr + fl;
  // const ready = (tr * 100) / +sum;
  // const notReady = (fl * 100) / +sum;
  // console.log(tr, fl, ready, notReady, sum);

  useEffect(() => {
    // let tr = 0;
    // let fl = 0;
    // if (tasks) {
    //   tasks[0].taskDate?.forEach((el) => {
    //     el.status ? tr++ : fl++;
    //   });
    // }
    // const sum = tr + fl;
    // const ready = (tr * 100) / +sum;
    // const notReady = (fl * 100) / +sum;
    // console.log(tr, fl, ready, notReady, sum);
    // setReady(ready);
    // setNotReady(notReady);
    // console.log(tasks, "##3##");
  }, []);

  return (
    <section className="progress_circle">
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
        <h3 className="title">Progress</h3>
        <ul className="caption-list">
          <li className="caption-item">Ready</li>
          <li className="caption-item">Not done</li>
        </ul>
      </div>
    </section>
  );
};

export default ProgressCircle;
