import React, { useState, ChangeEvent } from "react";
import { categoriesApi } from "../../service/categoriesService";
import { TCreateCategories } from "../../types/TypeCategories";
import { Button, Input } from "../UI/BaseComponent";
import CategoriesColors from "./ColorsList";
import ErrorMessage from "../UI/Error/ErrorMessage";
import s from "./Categories.module.scss";

interface CreateCategoriesProps {
  onCloseCategoryModel: () => void;
}

function CreateCategories({ onCloseCategoryModel }: CreateCategoriesProps): JSX.Element {
  const [createCategory, { error, isLoading }] = categoriesApi.useCreateCategoriesMutation();
  const [category, setCategory] = useState<TCreateCategories>({
    name: "",
    color: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onChangeCategoryName = (e: ChangeEvent<HTMLInputElement>): void => {
    setCategory({ ...category, name: e.target.value });
  };
  // eslint-disable-next-line consistent-return
  const createdCategory = (): void => {
    setErrorMessage("");
    if (category.name.length <= 3) {
      return setErrorMessage("Длина имени должна быть больше 3 символов");
    }
    if (category.color === "") {
      return setErrorMessage("Категория не выбрана");
    }
    createCategory(category).then(() => {
      onCloseCategoryModel();
    });
    setCategory({
      name: "",
      color: "",
    });
  };

  // eslint-disable-next-line no-console
  if (error) console.error("CreateCategories.tsx file", error);

  return (
    <>
      <div className={s.crete_categories}>
        <div className={s.crete_categories_input_group}>
          <Input
            type="text"
            onChange={onChangeCategoryName}
            value={category.name}
            placeholder="Имя категории"
          />
        </div>
        <CategoriesColors state={category} setState={setCategory} />
        {errorMessage ? <ErrorMessage message={errorMessage} /> : ""}
        <div className={s.create_buttons}>
          <Button className={s.create_button} onClick={createdCategory} isLoading={isLoading}>
            Создать
          </Button>
        </div>
      </div>
    </>
  );
}

export default CreateCategories;
