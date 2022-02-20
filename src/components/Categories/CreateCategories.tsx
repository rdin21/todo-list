import { FC, useState, ChangeEvent } from "react";
import { categoriesApi } from "../../service/categoriesService";
import { TCreateCategories } from "../../types/TypeCategories";
import CategoriesColors from "./ColorsList";

interface CreateCategoriesProps {
  onCloseCategoryModel: () => void;
}

const CreateCategories: FC<CreateCategoriesProps> = ({ onCloseCategoryModel }) => {
  const [
    createCategory,
    // , { error, isLoading }
  ] = categoriesApi.useCreateCategoriesMutation();
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
    createCategory(category);
    setCategory({
      name: "",
      color: "",
    });
    // setActive(undefined);
    onCloseCategoryModel();
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
        <CategoriesColors state={category} setState={setCategory} />
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
