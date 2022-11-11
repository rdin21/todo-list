import { DataTypeTasks } from "./../types/TypeTask";
import { useEffect, useState } from "react";

function useProgressCircle(tasks: DataTypeTasks[]): Array<number> {
  const [ready, setReady] = useState(0);
  const [notReady, setNotReady] = useState(100);

  useEffect(() => {
    let tr = 0;
    let fl = 0;
    if (tasks) {
      tasks[0]?.taskDate?.forEach((el) => {
        el.status ? tr++ : fl++;
      });
    }
    const sum = tr + fl;
    const ready = (tr * 100) / +sum;
    const notReady = (fl * 100) / +sum;
    setReady(ready);
    setNotReady(notReady);
  });

  return [ready, notReady];
}

export default useProgressCircle;
