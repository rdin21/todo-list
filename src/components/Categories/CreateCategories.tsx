import s from "./Categories.module.scss";
import { useState, ChangeEvent } from "react";
import { categoriesApi } from "../../service/categoriesService";
import { TCreateCategories } from "../../types/TypeCategories";
import { Button } from "../BaseComponent";
import CategoriesColors from "./ColorsList";

interface CreateCategoriesProps {
  onCloseCategoryModel: () => void;
}

function CreateCategories({ onCloseCategoryModel }: CreateCategoriesProps): JSX.Element {
  const [createCategory, { error: createCategoryError, isLoading: createCategoryLoading }] =
    categoriesApi.useCreateCategoriesMutation();
  // const [active, setActive] = useState<number | undefined>();
  const [category, setCategory] = useState<TCreateCategories>({
    name: "",
    color: "",
  });

  const onChangeCategoryName = (e: ChangeEvent<HTMLInputElement>): void => {
    setCategory({ ...category, name: e.target.value });
  };
  const createdCategory = (): void => {
    // console.log(category);
    createCategory(category).then(() => onCloseCategoryModel());
    setCategory({
      name: "",
      color: "",
    });
    // setActive(undefined);
  };
  // console.log(error);

  return (
    <>
      <div className={s.crete_categories}>
        <h3>Create categories</h3>
        <div className={s.crete_categories_input_group}>
          <input
            type="text"
            onChange={onChangeCategoryName}
            value={category.name}
            placeholder="category"
          />
        </div>
        <CategoriesColors state={category} setState={setCategory} />
        <div className={s.create_buttons}>
          <Button
            className={s.create_buttons_btn}
            onClick={createdCategory}
            isLoading={createCategoryLoading}
          >
            Add category
          </Button>
        </div>
      </div>
    </>
  );
}

export default CreateCategories;
