import "../components/Home/Home.scss";
import { FC, useState } from "react";
import Header from "../components/Header/Header";
import Statistics from "../components/Home/Statistics";
import TasksList from "../components/Home/TasksList";
import AddTask from "../components/AddTask/AddTask";
import Modal from "../components/Modal/Modal";
import CreateCategories from "../components/Categories/CreateCategories";
import { Button } from "../components/BaseComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteCategories from "../components/Categories/DeleteCategories";
import UpdateCategories from "../components/Categories/UpdateCategories";

const Home: FC = () => {
  const [createTask, setCreateTask] = useState<boolean>(false);
  const [createCategory, setCreateCategory] = useState<boolean>(false);
  const [deleteCategory, setDeleteCategory] = useState<boolean>(false);
  const [upDateCategory, setUpDateCategory] = useState<boolean>(false);

  const onCloseTaskModel = () => setCreateTask(false);
  const onCloseCategoryModel = () => setCreateCategory(false);
  const onCloseDeleteCategoryModel = () => setDeleteCategory(false);
  const onCloseUpDateCategoryModel = () => setUpDateCategory(false);
  return (
    <main className="main">
      <div className="container">
        <Header />
        <section className="statistics__block">
          <Statistics />
        </section>
        <div className="create-task-categories-buttons">
          <Button
            onClick={() => setCreateTask(true)}
            className="create-task-categories-btns plus-btn"
          >
            <FontAwesomeIcon icon={faPlus} className="plus" />
            task
          </Button>
          <Button
            onClick={() => setCreateCategory(true)}
            className="create-task-categories-btns plus-btn"
          >
            <FontAwesomeIcon icon={faPlus} className="plus" />
            category
          </Button>
          <Button
            onClick={() => setDeleteCategory(true)}
            className="create-task-categories-btns minus-btn"
          >
            <FontAwesomeIcon icon={faTrash} className="minus" />
            category
          </Button>
          <Button
            onClick={() => setUpDateCategory(true)}
            className="create-task-categories-btns minus-btn"
          >
            <FontAwesomeIcon icon={faTrash} className="minus" />
            update
          </Button>
        </div>

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
};

export default Home;
