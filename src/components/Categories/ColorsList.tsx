import s from "./Categories.module.scss";
import { useState, MouseEvent } from "react";
import { categoriesApi } from "../../service/categoriesService";
import { TCreateCategories, TColorsCategories, TUpDateCategory } from "../../types/TypeCategories";

const colors: TColorsCategories[] = [
  { id: 1, color: "color-green", name: "green" },
  { id: 2, color: "color-yellow", name: "yellow" },
  { id: 3, color: "color-red", name: "red" },
  { id: 4, color: "color-blue", name: "blue" },
  { id: 5, color: "color-orange", name: "orange" },
  { id: 6, color: "color-gray", name: "gray" },
  { id: 7, color: "color-violet", name: "violet" },
];

interface CategoriesColorsProps {
  state: TCreateCategories | TUpDateCategory;
  setState: (categories: TCreateCategories | TUpDateCategory) => void;
}

function ColorsList({ state, setState }: CategoriesColorsProps): JSX.Element {
  const {
    data: categories,
    // error: getCategoriesError,
    // isLoading: loadingCategoriesError,
  } = categoriesApi.useGetCategoriesQuery(2);
  const [active, setActive] = useState<number | undefined>();
  const onClickColor = (e: MouseEvent<HTMLButtonElement>): void => {
    const { innerText } = e.currentTarget;
    const [id, color] = innerText.split("|");
    setActive(Number(id));
    setState({ ...state, color });
  };
  return (
    <ul className={s.crete_categories_colors}>
      <li className={s.crete_categories_colors_name}>Colors</li>
      {colors.map((color: TColorsCategories): JSX.Element => {
        const findCategory = categories?.find((v) => v.color === color.name);

        return (
          <li key={color.id}>
            <button
              type="button"
              onClick={onClickColor}
              className={`${s.crete_categories_color_item} ${color.color} ${
                color.id === active ? "active" : ""
              } ${findCategory ? "disabled" : ""}`}
              disabled={!!findCategory}
            >{`${color.id}|${color.name}`}</button>
          </li>
        );
      })}
    </ul>
  );
}

export default ColorsList;