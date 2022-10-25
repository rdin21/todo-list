import React, { useEffect, useState } from "react";
import Clock from "../Header/Clock";
import s from "./TimeLine.module.scss";
function TimeIndicator(): JSX.Element {
  const [step, setStep] = useState<number>(0);

  const stepFunc = () => {
    setStep(new Date().getMinutes());
  };

  useEffect(() => {
    const timerId = setInterval(() => stepFunc(), 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);
  return (
    <div className={s.time_line_current_time} style={{ marginTop: step + 10 + "px" }}>
      <Clock />
    </div>
  );
}

export default TimeIndicator;
