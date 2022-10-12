import React, { useState } from "react";
import Header from "../components/Header/Header";
import Statistics from "../components/Home/Statistics";
import TasksList from "../components/Home/TasksList";
import AddTask from "../components/AddTask/AddTask";
import Modal from "../components/Modal/Modal";
import CreateCategories from "../components/Categories/CreateCategories";
import DeleteCategories from "../components/Categories/DeleteCategories";
import UpdateCategories from "../components/Categories/UpdateCategories";
import s from "../components/Home/Home.module.scss";
import Buttons from "../components/Home/Buttons";

function Home(): JSX.Element {
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
        <Header />
        <section className="statistics__block">
          <Statistics />
        </section>

        <Buttons
          setCreateTask={setCreateTask}
          setCreateCategory={setCreateCategory}
          setDeleteCategory={setDeleteCategory}
          setUpDateCategory={setUpDateCategory}
        />

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
        <TasksList />
      </div>
    </main>
  );
}

export default Home;
