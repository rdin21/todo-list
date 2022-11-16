import React, { useState } from "react";
import classNames from "classnames";
import Spinner from "../UI/Loaders/LoaderSpinner";
import { categoriesApi } from "../../service/categoriesService";
import ErrorMessage from "../UI/Error/ErrorMessage";
import s from "./Categories.module.scss";

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
  const { data: categories, error, isLoading } = categoriesApi.useGetCategoriesQuery(NaN);
  const [active, setActive] = useState<number | null>(null);
  // eslint-disable-next-line no-console
  if (error) console.log("CategoriesList.tsx file", error);

  const chooseCategory = (id: number) => {
    onClick(id);
    setActive(id);
  };

  return (
    <ul className={classNameList}>
      {error ? <ErrorMessage message={"Не удалось загрузить категории"} /> : ""}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {categories?.map(
            (category): JSX.Element => (
              <li
                className={classNames(classNameItem, active === category.id ? s.active : "")}
                key={category.id}
                onClick={() => chooseCategory(category.id)}
                title="Обновить"
                style={{ border: `2px solid ${category.color}` }}
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TopHeaderPropsAreEqual(prevProps: any, nextProps: any) {
  return prevProps !== nextProps;
}

const MemoizedTopHeader = React.memo(CategoriesList, TopHeaderPropsAreEqual);

export default MemoizedTopHeader;
