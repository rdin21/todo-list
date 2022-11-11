import React from "react";
import s from "./ProgressColumn.module.scss";
import { TCategoriesAndTask } from "../../../types/TypeCategories";
import Spinner from "../../UI/Loaders/LoaderSpinner";
import Item from "./Item";

interface ColumnsProps {
  data: TCategoriesAndTask[];
  isLoading: boolean;
}
function Columns({ data, isLoading }: ColumnsProps): JSX.Element {
  return (
    <div className={s.list}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {data?.length === 0 ? (
            <b>На сегодня нет задач</b>
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
