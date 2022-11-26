import React, { useState } from "react";
import Statistics from "../components/Home/Statistics";
import TasksList from "../components/Home/TaskList/TasksList";
import AddTask from "../components/AddTask/AddTask";
import Modal from "../components/UI/Modal/Modal";
import CreateCategories from "../components/Categories/CreateCategories";
import DeleteCategories from "../components/Categories/DeleteCategories";
import UpdateCategories from "../components/Categories/UpdateCategories";
import Buttons from "../components/Home/AddTaskBtn";
import { useAppSelector } from "../hooks/redux";
import { TUserFromAccessToken } from "../types/TypeUser";
import { taskApi } from "../service/taskService";
import { formatDate } from "../utils/utils";
import Header from "../components/Header/Header";

function Home(): JSX.Element {
  const user = useAppSelector((s) => s.user.data) as TUserFromAccessToken;
  const {
    data: tasks,
    error: getTaskError,
    isLoading: loadingTasks,
  } = taskApi.useGetTaskByDateQuery(`?date=${formatDate}&userId=${user.id}`);
  const [createTask, setCreateTask] = useState<boolean>(false);
  const [createCategory, setCreateCategory] = useState<boolean>(false);
  const [deleteCategory, setDeleteCategory] = useState<boolean>(false);
  const [upDateCategory, setUpDateCategory] = useState<boolean>(false);

  const onCloseTaskModel = (): void => setCreateTask(false);
  const onCloseCategoryModel = (): void => setCreateCategory(false);
  const onCloseDeleteCategoryModel = (): void => setDeleteCategory(false);
  const onCloseUpDateCategoryModel = (): void => setUpDateCategory(false);

  return (
    <main className="main">
      <div className="container">
        <Header userName={user.name} tasks={tasks} getTaskError={getTaskError} />
        <section className="statistics__block">
          {user.id ? (
            <Statistics tasks={tasks} getTaskError={getTaskError} loadingTasks={loadingTasks} />
          ) : (
            ""
          )}
        </section>

        <Buttons setCreateTask={setCreateTask} />

        <Modal show={createTask} onClose={onCloseTaskModel}>
          <AddTask onCloseModal={onCloseTaskModel} />
        </Modal>
        <Modal show={createCategory} onClose={onCloseCategoryModel}>
          <CreateCategories onCloseCategoryModel={onCloseCategoryModel} />
        </Modal>
        <Modal show={deleteCategory} onClose={onCloseDeleteCategoryModel}>
          <DeleteCategories />
        </Modal>
        <Modal show={upDateCategory} onClose={onCloseUpDateCategoryModel}>
          <UpdateCategories />
        </Modal>

        {user.id ? (
          <TasksList
            userId={user.id}
            tasks={tasks}
            getTaskError={getTaskError}
            loadingTasks={loadingTasks}
          />
        ) : (
          ""
        )}
      </div>
    </main>
  );
}

export default Home;
