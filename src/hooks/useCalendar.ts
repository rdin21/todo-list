import { useState, useMemo } from "react";

function useCalendar(date: Date): Array<string | number> {
  const [days, setDays] = useState<Array<string | number>>([]);
  useMemo(() => {
    date.setDate(1);

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDays = 7 - lastDayIndex - 1;
    const monthDays = [];

    for (let x = firstDayIndex; x > 0; x--) {
      monthDays.push(`${prevLastDay - x + 1}|prev-date`);
    }
    for (let i = 1; i <= lastDay; i++) {
      if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
        monthDays.push(`${i}|today`);
      } else {
        monthDays.push(i);
      }
    }
    for (let j = 1; j <= nextDays; j++) monthDays.push(`${j}|next-date`);
    setDays([...monthDays]);
  }, [date]);

  return days;
}

export default useCalendar;
