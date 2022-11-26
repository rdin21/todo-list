import Header from "../components/Header/Header";
import Index from "../components/Сalendar/Calendar";
import { useAppSelector } from "../hooks/redux";
import { taskApi } from "../service/taskService";
import { TUserFromAccessToken } from "../types/TypeUser";
import { formatDate } from "../utils/utils";

const Calendar = (): JSX.Element => {
  const user = useAppSelector((s) => s.user.data) as TUserFromAccessToken;
  const { data: tasks, error: getTaskError } = taskApi.useGetTaskByDateQuery(
    `?date=${formatDate}&userId=${user.id}`
  );
  return (
    <div className="container">
      <Header userName={user.name} tasks={tasks} getTaskError={getTaskError} />
      <Index />
    </div>
  );
};

export default Calendar;
