import React from "react";
import { categoriesApi } from "../../service/categoriesService";
import Loading from "../Preloader/Loading";

interface CategoriesListProps {
  classNameList?: string;
  classNameItem?: string;
  classNameIcon?: string;
  icon?: JSX.Element;
  onClick: (id: number) => void;
}

function CategoriesList({
  classNameList,
  classNameItem,
  classNameIcon,
  icon,
  onClick,
}: CategoriesListProps): JSX.Element {
  const { data: categories, error, isLoading } = categoriesApi.useGetCategoriesQuery(2);

  // eslint-disable-next-line no-console
  if (error) console.log("CategoriesListError", error);

  return (
    <ul className={classNameList}>
      {isLoading ? (
        <Loading />
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

function TopHeaderPropsAreEqual(prevProps: any, nextProps: any) {
  return prevProps !== nextProps;
}

const MemoizedTopHeader = React.memo(CategoriesList, TopHeaderPropsAreEqual);

export default MemoizedTopHeader;
