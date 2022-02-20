import { useState } from "react";
import "./Categories.scss";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categoriesApi } from "../../service/categoriesService";
import { TCreateCategories, TUpDateCategory } from "../../types/TypeCategories";
import ColorsList from "./ColorsList";
import { Button, Input } from "../BaseComponent";
import CategoriesList from "./CategoriesList";

function UpdateCategories(): JSX.Element {
  const [id, setIdCategory] = useState<number | null>(null);
  const [updateCategory, setUpDateCategory] = useState<TCreateCategories>({
    color: "",
    name: "",
  });
  const [updateCategoryHook, { error: upDateCategoryError, isLoading: upDateCategoryLoading }] =
    categoriesApi.useUpDateCategoriesMutation();

  const onClick = (id: number): void => setIdCategory(id);

  const upDateName = (e: any) => {
    setUpDateCategory({ ...updateCategory, name: e.target.value });
  };

  const submitCategory = () => {
    console.log({ id, ...updateCategory });
    updateCategoryHook({ id, ...updateCategory } as TUpDateCategory);
  };

  return (
    <section className="update-block">
      <h3 className="update-block-title">Обновить категорию</h3>
      <CategoriesList
        classNameList="update-list"
        classNameItem="update-list-item"
        classNameIcon="update-list-item-icon"
        icon={<FontAwesomeIcon icon={faPen} />}
        onClick={onClick}
      />

      <div className="update-block-new-name">
        <span>New name</span>
        <Input value={updateCategory.name} onChange={upDateName} />
      </div>
      <ColorsList state={updateCategory} setState={setUpDateCategory} />

      <Button className="update-block-button" onClick={submitCategory}>
        Update
      </Button>
    </section>
  );
}

export default UpdateCategories;
