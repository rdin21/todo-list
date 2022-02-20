import "./Categories.scss";
import { FC } from "react";
import { categoriesApi } from "../../service/categoriesService";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoriesList from "./CategoriesList";

const DeleteCategories: FC = () => {
  const [deleteCategories, { error: deleteCategoriesError, isLoading: deleteLoading }] =
    categoriesApi.useDeleteCategoriesMutation();

  const onClick = (id: number) => deleteCategories(id);

  if (deleteCategoriesError) {
    // eslint-disable-next-line no-console
    console.log("DeleteCategories-DELETE", deleteCategoriesError);
  }
  return (
    <section className="delete-block">
      <h3 className="block-title">Удолить категорию</h3>
      <i>Нажмите 2 раза чтобы удалить категорию.</i>
      <ul className="delete-list">
        <CategoriesList
          classNameList="delete-list"
          classNameItem="list-item"
          classNameIcon="list-item-delete-icon"
          icon={<FontAwesomeIcon icon={faTrash} />}
          onClick={onClick}
        />
      </ul>
    </section>
  );
};

export default DeleteCategories;
