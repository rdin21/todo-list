import { useState, ChangeEvent } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./Categories.module.scss";
import { categoriesApi } from "../../service/categoriesService";
import { TCreateCategories, TUpDateCategory } from "../../types/TypeCategories";
import ColorsList from "./ColorsList";
import { Button, Input } from "../UI/BaseComponent";
import CategoriesList from "./CategoriesList";
import Spinner from "../UI/Preloader/Spinner";

function UpdateCategories(): JSX.Element {
  const [id, setIdCategory] = useState<number | null>(null);
  const [updateCategory, setUpDateCategory] = useState<TCreateCategories>({
    color: "",
    name: "",
  });
  const [updateCategoryHook, { error, isLoading }] = categoriesApi.useUpDateCategoriesMutation();

  const onClick = (id: number): void => setIdCategory(id);

  const upDateName = (e: ChangeEvent<HTMLInputElement>): void => {
    setUpDateCategory({ ...updateCategory, name: e.target.value });
  };

  const submitCategory = (): void => {
    updateCategoryHook({ id, ...updateCategory } as TUpDateCategory);
    setUpDateCategory({ color: "", name: "" });
  };
  // eslint-disable-next-line no-console
  if (error) console.log("UpDateCategoryError", error);

  return (
    <section className={s.update_block}>
      <h3 className={s.update_block_title}>Обновить категорию</h3>
      <CategoriesList
        classNameList={s.update_list}
        classNameItem={s.update_list_item}
        classNameIcon={s.update_list_item_icon}
        icon={<FontAwesomeIcon icon={faPen} />}
        onClick={onClick}
      />

      <div className={s.update_block_new_name}>
        <span>New name</span>
        <Input value={updateCategory.name} onChange={upDateName} />
      </div>
      <ColorsList state={updateCategory} setState={setUpDateCategory} />

      <Button className={s.update_block_button} onClick={submitCategory}>
        Update
      </Button>
      {isLoading ? <Spinner text="Идет обновление..." spinnerBlock={s.spinner_update} /> : ""}
    </section>
  );
}

export default UpdateCategories;
