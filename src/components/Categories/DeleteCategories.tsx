import "./Categories.scss";
import { FC } from "react";
import { categoriesApi } from "../../service/categoriesService";
import Preloader2 from "../Preloader/Preloader2";
import classNames from "classnames";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeleteCategories: FC = () => {
  const {
    data: categories,
    error: getCategoriesError,
    isLoading: loadingCategories,
  } = categoriesApi.useGetCategoriesQuery(2);

  const [deleteCategories, { error: deleteCategoriesError, isLoading: deleteLoading }] =
    categoriesApi.useDeleteCategoriesMutation();
  const onClick = (id: number) => {
    deleteCategories(id);
  };
  console.log(deleteLoading);

  if (getCategoriesError) {
    // eslint-disable-next-line no-console
    console.log("DeleteCategories-GET", getCategoriesError);
  }
  if (deleteCategoriesError) {
    // eslint-disable-next-line no-console
    console.log("DeleteCategories-DELETE", deleteCategoriesError);
  }
  return (
    <section className="delete__block">
      <h3 className="block__title">Удолить категорию</h3>
      <i>Нажмите 2 раза чтобы удалить категорию.</i>
      <ul className="delete__list">
        {loadingCategories ? (
          <Preloader2 />
        ) : (
          <>
            {categories?.map(
              (category): JSX.Element => (
                <li
                  className={classNames("list__item", "delete-animate")}
                  key={category.id}
                  onDoubleClick={() => onClick(category.id)}
                  title="Удолить"
                >
                  {category.name}
                  <span className="list__item__delete-icon">
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </li>
              )
            )}
          </>
        )}
      </ul>
    </section>
  );
};

export default DeleteCategories;
