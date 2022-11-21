import React, { CSSProperties, useEffect, useState } from "react";

interface IClockProps {
  className?: string;
  style?: CSSProperties;
}

const Clock = ({ className, style }: IClockProps): JSX.Element => {
  const [date, setDate] = useState({
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
  });
  const tick = () => {
    setDate({
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
    });
  };
  useEffect(() => {
    const timerId = setInterval(() => tick(), 20000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className={className} style={style}>{`${date.hour}:${
      String(date.minute).length === 1 ? "0" + date.minute : date.minute
    }`}</div>
  );
};
export default Clock;
