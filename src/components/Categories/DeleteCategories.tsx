import { FC } from "react";
import { categoriesApi } from "../../service/categoriesService";
import Preloader2 from "../Preloader/Preloader2";

const DeleteCategories: FC = () => {
  const {
    data: categories,
    // error: getCategoriesError,
    isLoading: loadingCategoriesError,
  } = categoriesApi.useGetCategoriesQuery(2);

  const [
    deleteCategories,
    // , { error: deleteError }
  ] = categoriesApi.useDeleteCategoriesMutation();
  const onClick = (id: number) => {
    deleteCategories(id);
  };
  return (
    <section className="delete__block">
      <h3 className="block__title">Delete Category</h3>
      <ul className="delete__list">
        {loadingCategoriesError ? (
          <Preloader2 />
        ) : (
          <>
            {categories?.map(
              (category): JSX.Element => (
                <li className="list__item" key={category.id} onClick={() => onClick(category.id)}>
                  {category.name}
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
