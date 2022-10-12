import React, { ChangeEvent } from "react";
import { Input } from "../BaseComponent";
import { IDateTask } from "./Types";
import s from "./AddTask.module.scss";

interface DateInputsProps {
  date: string;
  time: IDateTask;
  setDate: (e: string) => void;
  setTime: (e: IDateTask) => void;
}
function DateInputs({ date, time, setDate, setTime }: DateInputsProps): JSX.Element {
  const onChangeHour = (e: ChangeEvent<HTMLInputElement>) =>
    setTime({ ...time, hour: e.target.value });

  const onChangeMinute = (e: ChangeEvent<HTMLInputElement>) =>
    setTime({ ...time, minute: e.target.value });

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value);

  return (
    <div className={s.data_input_group}>
      <Input
        type="date"
        name="date"
        onChange={onChangeDate}
        className={s.data_input_group_date}
        value={date}
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
      </div>
    </div>
  );
}
// function TopHeaderPropsAreEqual(prevProps: any, nextProps: any) {
//   return prevProps !== nextProps;
// }

// const MemoizedTopHeader = React.memo(CategoriesList, TopHeaderPropsAreEqual);
export default React.memo(DateInputs);
