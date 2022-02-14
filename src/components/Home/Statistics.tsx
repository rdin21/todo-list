import { FC } from "react";
import ProgressCircle from "./ProgressCircle/ProgressCircle";
import ProgressColumn from "./ProgressColumn/ProgressColumn";
const Statistics: FC = () => {
  return (
    <div className="progress">
      <ProgressCircle />
      <ProgressColumn />
    </div>
  );
};

export default Statistics;
