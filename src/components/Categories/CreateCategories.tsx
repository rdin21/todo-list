import { FC, useState, MouseEvent, ChangeEvent } from "react";
import { categoriesApi } from "../../service/categoriesService";
import { TCreateCategories, TColorsCategories } from "../../types/TypeCategories";

const colors: TColorsCategories[] = [
  { id: 1, color: "color-green", name: "green" },
  { id: 2, color: "color-yellow", name: "yellow" },
  { id: 3, color: "color-red", name: "red" },
  { id: 4, color: "color-blue", name: "blue" },
  { id: 5, color: "color-orange", name: "orange" },
  { id: 6, color: "color-gray", name: "gray" },
  { id: 7, color: "color-violet", name: "violet" },
];

const CreateCategories: FC = () => {
  const {
    data: categories,
    // error: getCategoriesError,
    // isLoading: loadingCategoriesError,
  } = categoriesApi.useGetCategoriesQuery(2);
  const [
    createCat,
    // , { error, isLoading }
  ] = categoriesApi.useCreateCategoriesMutation();
  const [active, setActive] = useState<number | undefined>();
  const [category, setCategory] = useState<TCreateCategories>({
    name: "",
    color: "",
  });

  const onClickColor = (e: MouseEvent<HTMLButtonElement>): void => {
    const { innerText } = e.currentTarget;
    const [id, color] = innerText.split("|");
    setActive(Number(id));
    setCategory({ ...category, color });
  };
  const onChangeCategoryName = (e: ChangeEvent<HTMLInputElement>): void => {
    setCategory({ ...category, name: e.target.value });
  };
  const createdCategory = (): void => {
    // console.log(category);
    createCat(category);
    setCategory({
      name: "",
      color: "",
    });
    setActive(undefined);
  };
  // console.log(error);

  return (
    <>
      <div className="crete-categories">
        <h3>Create categories</h3>
        <div className="crete-categories-input-group">
          <input
            type="text"
            onChange={onChangeCategoryName}
            value={category.name}
            placeholder="category"
          />
        </div>
        <ul className="crete-categories-colors">
          <li className="crete-categories-colors-name">Colors</li>
          {colors.map((color: TColorsCategories): JSX.Element => {
            const category = categories?.find((v) => v.color === color.name);

            return (
              <li key={color.id}>
                <button
                  onClick={onClickColor}
                  className={`crete-categories-color-item ${color.color} ${
                    color.id === active ? "active" : ""
                  } ${category ? "disabled" : ""}`}
                  disabled={category ? true : false}
                >{`${color.id}|${color.name}`}</button>
              </li>
            );
          })}
        </ul>
        <div className="create-buttons">
          <button className="create-buttons-btn" onClick={createdCategory}>
            Add category
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateCategories;
