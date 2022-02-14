import { FC } from "react";
import CreateCategories from "../components/Categories/CreateCategories";
import DeleteCategories from "../components/Categories/DeleteCategories";
import Header from "../components/Header/Header";
const AddTasks: FC = () => {
  return (
    <div className="container">
      <Header />
      <CreateCategories />
      <DeleteCategories />
    </div>
  );
};

export default AddTasks;
