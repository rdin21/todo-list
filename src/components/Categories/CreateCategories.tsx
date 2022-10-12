import s from "./Categories.module.scss";
import { useState, ChangeEvent } from "react";
import { categoriesApi } from "../../service/categoriesService";
import { TCreateCategories } from "../../types/TypeCategories";
import { Button, Input } from "../UI/BaseComponent";
import CategoriesColors from "./ColorsList";

interface CreateCategoriesProps {
  onCloseCategoryModel: () => void;
}

function CreateCategories({ onCloseCategoryModel }: CreateCategoriesProps): JSX.Element {
  const [createCategory, { error, isLoading }] = categoriesApi.useCreateCategoriesMutation();
  const [category, setCategory] = useState<TCreateCategories>({
    name: "",
    color: "",
  });

  const onChangeCategoryName = (e: ChangeEvent<HTMLInputElement>): void => {
    setCategory({ ...category, name: e.target.value });
  };
  const createdCategory = (): void => {
    createCategory(category).then(() => onCloseCategoryModel());
    setCategory({
      name: "",
      color: "",
    });
  };

  // eslint-disable-next-line no-console
  if (error) console.log("createCategoryError", error);

  return (
    <>
      <div className={s.crete_categories}>
        <h3>Создать категорию</h3>
        <div className={s.crete_categories_input_group}>
          <Input
            type="text"
            onChange={onChangeCategoryName}
            value={category.name}
            placeholder="Имя категории"
          />
        </div>
        <CategoriesColors state={category} setState={setCategory} />
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
