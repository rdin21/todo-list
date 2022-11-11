import React, { ChangeEvent } from "react";
import { Input } from "../UI/BaseComponent";
import { IDateTask } from "./Types";
import s from "./AddTask.module.scss";
interface DateInputsProps {
  date: string;
  time: IDateTask;
  setDate: (e: string) => void;
  setTime: (e: IDateTask) => void;
}
function DateInputs({ date, time, setDate, setTime }: DateInputsProps): JSX.Element {
  const onChangeHour = (e: ChangeEvent<HTMLInputElement>) => {
    if (time.hour.length !== 2) setTime({ ...time, hour: e.target.value });
  };

  const onChangeMinute = (e: ChangeEvent<HTMLInputElement>) => {
    if (time.minute.length !== 2) setTime({ ...time, minute: e.target.value });
  };

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value);

  const clearTime = () => {
    setTime({
      hour: "",
      minute: "",
    });
  };
  return (
    <div className={s.data_input_group}>
      <Input
        type="date"
        name="date"
        onChange={onChangeDate}
        className={s.data_input_group_date}
        value={date}
        data-date={new Date().getDate()}
      />

      <span className={s.data_input_group_separator}>-</span>
      <div className={s.data_input_group_time}>
        <Input
          type="number"
          placeholder="Час"
          name="time"
          onChange={onChangeHour}
          value={time.hour}
        />
        <span>:</span>
        <Input
          type="number"
          placeholder="Минуты"
          name="time"
          onChange={onChangeMinute}
          value={time.minute}
        />
        <span className={s.data_input_group_clear_time} title="Очистить время" onClick={clearTime}>
          {" "}
          &times;
        </span>
      </div>
    </div>
  );
}

export default React.memo(DateInputs);
