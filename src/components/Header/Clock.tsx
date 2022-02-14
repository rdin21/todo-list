import { useEffect, useState } from "react";

const Clock = (): JSX.Element => {
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

  return <span>{`${date.hour}:${date.minute}`}</span>;
};
export default Clock;
