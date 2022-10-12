import React, { memo } from "react";
import s from "./ProgressColumn.module.scss";
import { TCategoriesAndTask } from "../../../types/TypeCategories";
import Preloader2 from "../../UI/Preloader/Loading";
import Item from "./Item";

interface ColumnsProps {
  data: TCategoriesAndTask[];
  isLoading: boolean;
}

function Columns({ data, isLoading }: ColumnsProps): JSX.Element {
  return (
    <div className={s.list}>
      {isLoading ? (
        <Preloader2 />
      ) : (
        <>
          {data?.length === 0 ? (
            <b>На сегодня нет категорий</b>
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
export default Columns;
