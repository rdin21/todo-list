import React from "react";
import { ICategories } from "../../../types/TypeCategories";
import { Task } from "../../../types/TypeTask";
import { v4 as uuidv4 } from "uuid";
import TaskItem from "../Item/TaskItem";
function LongList({
  hours,
  categories,
}: {
  hours: [Task[]];
  categories?: ICategories[];
}): JSX.Element {
  const hour = new Date().getHours();

  return (
    <>
      {hours.map((task: Task[], i: number) =>
        i + 1 < hour ? (
          ""
        ) : task.length > 0 ? (
          <div key={uuidv4()}>
            {task.map((el: Task) => {
              const category = categories?.find((v: ICategories) => v.id === el.categoriesID);
              return (
                <TaskItem
                  id={el.id}
                  key={uuidv4()}
                  status={el.status}
                  time={`${el.time}`}
                  task={el.text}
                  color={category?.color}
                />
              );
            })}
          </div>
        ) : (
          <div key={uuidv4()} style={{ height: "70px" }}></div>
        )
      )}
    </>
  );
}

export default LongList;
