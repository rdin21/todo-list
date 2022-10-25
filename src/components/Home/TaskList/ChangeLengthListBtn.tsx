import React, { memo } from "react";
import s from "../Home.module.scss";
interface IChangeLengthListBtnProps {
  setLengthLine: () => void;
  lengthLineValue: string;
}

function ChangeLengthListBtn({
  setLengthLine,
  lengthLineValue,
}: IChangeLengthListBtnProps): JSX.Element {
  return (
    <div className={s.show_all_line}>
      <button onClick={setLengthLine} className={s.show_all_line_btn} title="Изменить линию">
        {lengthLineValue === "all" ? "Показать всю линию" : "Показать короткую линию"}
      </button>
    </div>
  );
}

export default memo(ChangeLengthListBtn);
