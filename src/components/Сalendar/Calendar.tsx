import { useState } from "react";
import useCalendar from "../../hooks/useCalendar";
import { formatFullDate } from "../../utils/utils";
import { taskApi } from "../../service/taskService";
import Modal from "../UI/Modal/Modal";
import AnyDay from "./AnyDay";
import Month from "./Month";
import s from "./Calendar.module.scss";
import Weekdays from "./Weekdays";

const dayMonth = new Date().getDate();

const Index = (): JSX.Element => {
  const [date, setDate] = useState<Date>(new Date());
  const days = useCalendar(date);
  const [getTasks, { data, isLoading, error }] = taskApi.useLazyGetTaskQuery();
  const [anyDay, setAnyDay] = useState<boolean>(false);

  const onCloseAnyDayModel = (): void => setAnyDay(false);

  const onClickOnDay = (day: string | number): void => {
    let numberDay = "";
    if (typeof day === "string") numberDay = String(day.split("|")[0]);
    else numberDay = String(day);
    const searchDate = formatFullDate(+numberDay, +date.getMonth() + 1, +date.getFullYear());
    getTasks(searchDate);
    setAnyDay(true);
  };

  // eslint-disable-next-line no-console
  if (error) console.log("Calendar.tsx file", error);

  return (
    <section className={s.calendar__container}>
      <div className={s.calendar}>
        <Month date={date} setDate={setDate} />
        <Weekdays />
        <div className={s.days}>
          {days?.map((day: string | number) => {
            if (typeof day === "string") {
              if (day[1] === "|" || day[2] === "|") {
                const numberAndClass = day.split("|");
                return (
                  <div
                    key={day}
                    className={s.days_not_this_month}
                    onClick={() => onClickOnDay(day)}
                  >
                    {+numberAndClass[0] === dayMonth ? (
                      <span color="green">{numberAndClass[0]}</span>
                    ) : (
                      <span>{numberAndClass[0]}</span>
                    )}
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
          <AnyDay data={data} isLoading={isLoading} />
        </Modal>
      </div>
    </section>
  );
};

export default Index;
