import React from "react";
import s from "./ProgressColumn.module.scss";
import { TCategoriesAndTask } from "../../../types/TypeCategories";
import Preloader2 from "../../Preloader/Loading";
import Item from "./Item";

interface ColumnsProps {
  data: TCategoriesAndTask[];
  isLoading: boolean;
}

export default function Columns({ data, isLoading }: ColumnsProps): JSX.Element {
  return (
    <div className={s.list}>
      {isLoading ? (
        <Preloader2 />
      ) : (
        <>
          {data?.length === 0 ? (
            <h2>На сегодня нет категорий</h2>
          ) : (
            data?.map((category: TCategoriesAndTask): JSX.Element => {
              const height = category.tasks.length * 10;
              return <Item category={category} height={height} key={category.id} />;
            })
          )}
        </>
      )}
    </div>
  );
}
