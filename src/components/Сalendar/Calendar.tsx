import s from "./Calendar.module.scss";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { months, weekdays } from "./daysMonths";
import useCalendar from "../../hooks/useCalendar";
import { formatFullDate } from "../../utils/utils";
import { taskApi } from "../../service/taskService";
import Modal from "../UI/Modal/Modal";
import AnyDay from "./AnyDay";

const Index = (): JSX.Element => {
  const [date, setDate] = useState<Date>(new Date());
  const days = useCalendar(date);
  const [getTasks, { data, isLoading, error }] = taskApi.useLazyGetTaskQuery();
  const [anyDay, setAnyDay] = useState<boolean>(false);

  const onCloseAnyDayModel = (): void => setAnyDay(false);

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
    setAnyDay(true);
  };
  // console.log(data);

  // eslint-disable-next-line no-console
  if (error) console.log("ErrorCalendar", error);

  return (
    <section className={s.calendar__container}>
      <h4>Календарь</h4>
      <div className={s.calendar}>
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

        <div className={s.weekdays}>
          {weekdays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className={s.days}>
          {days?.map((day: string | number) => {
            if (typeof day === "string") {
              if (day[1] === "|" || day[2] === "|") {
                const numberAndClass = day.split("|");
                return (
                  <div
                    key={day}
                    className={`${s}.${numberAndClass[1]}`}
                    onClick={() => onClickOnDay(day)}
                  >
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
        <Modal show={anyDay} onClose={onCloseAnyDayModel}>
          <AnyDay data={data} />
        </Modal>
      </div>
    </section>
  );
};

export default Index;
