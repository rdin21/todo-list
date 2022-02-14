import "./Calendar.scss";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { months, weekdays } from "./daysMonths";
import useCalendar from "../../hooks/useCalendar";
import { formatDate, formatFullDate } from "../../utils/utils";
import { taskApi } from "../../service/taskService";

const Index = (): JSX.Element => {
  const [date, setDate] = useState<Date>(new Date());
  const days = useCalendar(date);
  const [getTasks, { data, isLoading, error }] = taskApi.useLazyGetTaskQuery();

  // console.log(days);

  const prevMonth = (): void => {
    const newDate = date.setMonth(date.getMonth() - 1);
    setDate(new Date(newDate));
  };

  const nextMonth = (): void => {
    const newDate = date.setMonth(date.getMonth() + 1);
    setDate(new Date(newDate));
  };

  const onClickOnDay = (day: string | number): void => {
    let numberDay = "";
    if (typeof day === "string") numberDay = String(day.split("|")[0]);
    else numberDay = String(day);
    const searchDate = formatFullDate(+numberDay, +date.getMonth() + 1, +date.getFullYear());
    getTasks(searchDate);
  };
  console.log(data);

  return (
    <section className="calendarContainer">
      <h4>Calendar</h4>
      <div className="calendar">
        <div className="month">
          <i className="prev" onClick={prevMonth}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </i>
          <div className="date">
            <h1>{months[date.getMonth()]}</h1>
            <p>{date.toDateString()}</p>
          </div>
          <i className="next" onClick={nextMonth}>
            <FontAwesomeIcon icon={faAngleRight} />
          </i>
        </div>

        <div className="weekdays">
          {weekdays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="days">
          {days?.map((day: string | number) => {
            if (typeof day === "string") {
              if (day[1] === "|" || day[2] === "|") {
                const numberAndClass = day.split("|");
                return (
                  <div key={day} className={numberAndClass[1]} onClick={() => onClickOnDay(day)}>
                    {numberAndClass[0]}
                  </div>
                );
              }
            }
            return (
              <div key={day} onClick={() => onClickOnDay(day)}>
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Index;
