import React from "react";
import s from "./ProgressColumn.module.scss";
import { TCategoriesAndTask } from "../../../types/TypeCategories";

interface ItemProps {
  category: TCategoriesAndTask;
  height: number;
}

export default function Item({ category, height }: ItemProps): JSX.Element {
  return (
    <div className={s.list__item}>
      <span>{category?.tasks.length}</span>
      <div
        style={{
          background: `${category.color}`,
          height: `calc(100% / 100 * ${height})`,
        }}
        className={s.list__item__column}
      ></div>
    </div>
  );
}
