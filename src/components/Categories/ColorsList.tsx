import { useState, MouseEvent, memo } from "react";
import { categoriesApi } from "../../service/categoriesService";
import { TCreateCategories, TColorsCategories, TUpDateCategory } from "../../types/TypeCategories";
import { Button } from "../UI/BaseComponent";
import s from "./Categories.module.scss";

const colors: TColorsCategories[] = [
  { id: 2, color: "color-yellow", name: "yellow" },
  { id: 4, color: "color-blue", name: "blue" },
  { id: 5, color: "color-orange", name: "orange" },
  { id: 6, color: "color-gray", name: "gray" },
  { id: 7, color: "color-violet", name: "violet" },
  { id: 8, color: "color-gold", name: "gold" },
  { id: 9, color: "color-tomato", name: "tomato" },
  { id: 10, color: "color-teal", name: "teal" },
  { id: 11, color: "color-brown", name: "brown" },
  { id: 12, color: "color-pink", name: "pink" },
  { id: 13, color: "color-lime", name: "lime" },
];

interface CategoriesColorsProps {
  state: TCreateCategories | TUpDateCategory;
  setState: (categories: TCreateCategories | TUpDateCategory) => void;
}

function ColorsList({ state, setState }: CategoriesColorsProps): JSX.Element {
  const { data: categories, error, isLoading } = categoriesApi.useGetCategoriesQuery(2);
  const [active, setActive] = useState<number | undefined>();
  const onClickColor = (e: MouseEvent<HTMLButtonElement>): void => {
    const { innerText } = e.currentTarget;
    const [id, color] = innerText.split("|");
    setActive(Number(id));
    setState({ ...state, color });
  };

  // eslint-disable-next-line no-console
  if (error) console.log(error);

  return (
    <ul className={s.crete_categories_colors}>
      <li className={s.crete_categories_colors_name}>Цвет</li>
      {colors.map((color: TColorsCategories): JSX.Element => {
        const findCategory = categories?.find((v) => v.color === color.name);

        return (
          <li key={color.id}>
            <Button
              type="button"
              isLoading={isLoading}
              onClick={onClickColor}
              className={`${s.crete_categories_color_item} ${color.color} ${
                color.id === active ? s.active : ""
              } ${findCategory ? s.disabled : ""}`}
              disabled={!!findCategory}
            >{`${color.id}|${color.name}`}</Button>
          </li>
        );
      })}
    </ul>
  );
}

export default memo(ColorsList);
