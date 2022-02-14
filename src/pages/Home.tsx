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
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Home: FC = () => {
  const [createTask, setCreateTask] = useState<boolean>(false);
  const [createCategory, setCreateCategory] = useState<boolean>(false);

  const onCloseTaskModel = () => setCreateTask(false);
  const onCloseCategoryModel = () => setCreateCategory(false);
  return (
    <main className="main">
      <div className="container">
        <Header />
        <section className="statistics__block">
          <Statistics />
        </section>
        <div className="create-task-categories-buttons">
          <Button onClick={() => setCreateTask(true)} className="add-task-btn">
            <FontAwesomeIcon icon={faPlus} className="plus" />
            task
          </Button>
          <Button onClick={() => setCreateCategory(true)}>
            <FontAwesomeIcon icon={faPlus} className="plus" />
            categories
          </Button>
        </div>

        <Modal show={createTask} onClose={onCloseTaskModel}>
          <AddTask />
        </Modal>
        <Modal show={createCategory} onClose={onCloseCategoryModel}>
          <CreateCategories />
        </Modal>
        <TasksList />
      </div>
    </main>
  );
};

export default Home;
