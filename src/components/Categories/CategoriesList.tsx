import { categoriesApi } from "../../service/categoriesService";
import Preloader2 from "../Preloader/Preloader2";

interface CategoriesListProps {
  classNameList?: string;
  classNameItem?: string;
  classNameIcon?: string;
  icon?: JSX.Element;
  onClick: (id: number) => void;
}

export default function CategoriesList({
  classNameList,
  classNameItem,
  classNameIcon,
  icon,
  onClick,
}: CategoriesListProps): JSX.Element {
  const {
    data: categories,
    // error: getCategoriesError,
    isLoading: loadingCategories,
  } = categoriesApi.useGetCategoriesQuery(2);
  return (
    <ul className={classNameList}>
      {loadingCategories ? (
        <Preloader2 />
      ) : (
        <>
          {categories?.map(
            (category): JSX.Element => (
              <li
                className={classNameItem}
                key={category.id}
                onClick={() => onClick(category.id)}
                title="Обновить"
                style={{ border: `1px solid ${category.color}` }}
              >
                {category.name}
                <span className={classNameIcon}>{icon}</span>
              </li>
            )
          )}
        </>
      )}
    </ul>
  );
}
