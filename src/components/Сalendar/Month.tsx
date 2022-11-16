import React from "react";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { months } from "./daysMonths";
import s from "./Calendar.module.scss";

interface IMonthProps {
  date: Date;
  setDate: (date: Date) => void;
}

function Month({ date, setDate }: IMonthProps): JSX.Element {
  const prevMonth = (): void => {
    const newDate = date.setMonth(date.getMonth() - 1);
    setDate(new Date(newDate));
  };

  const nextMonth = (): void => {
    const newDate = date.setMonth(date.getMonth() + 1);
    setDate(new Date(newDate));
  };
  return (
    <div className={s.month}>
      <i className={s.prev} onClick={prevMonth}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </i>
      <div className={s.date}>
        <h1>{months[date.getMonth()]}</h1>
        <p>{date.toDateString()}</p>
      </div>
      <i className={s.next} onClick={nextMonth}>
        <FontAwesomeIcon icon={faAngleRight} />
      </i>
    </div>
  );
}

export default Month;
