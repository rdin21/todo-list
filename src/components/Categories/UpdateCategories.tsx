import { useState, ChangeEvent } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categoriesApi } from "../../service/categoriesService";
import { TCreateCategories, TUpDateCategory } from "../../types/TypeCategories";
import { Button, Input } from "../UI/BaseComponent";
import ColorsList from "./ColorsList";
import CategoriesList from "./CategoriesList";
import Spinner from "../UI/Loaders/LoaderSpinner";
import ErrorMessage from "../UI/Error/ErrorMessage";
import s from "./Categories.module.scss";

function UpdateCategories(): JSX.Element {
  const [id, setIdCategory] = useState<number | null>(null);
  const [messageError, setMessageError] = useState<string>("");
  const [updateCategoryHook, { error, isLoading }] = categoriesApi.useUpDateCategoriesMutation();
  const [updateCategory, setUpDateCategory] = useState<TCreateCategories>({
    color: "",
    name: "",
  });

  const onClick = (id: number): void => setIdCategory(id);

  const upDateName = (e: ChangeEvent<HTMLInputElement>): void => {
    setUpDateCategory({ ...updateCategory, name: e.target.value });
  };

  // eslint-disable-next-line consistent-return
  const onClickUpdateCategory = (): void | string => {
    setMessageError("");
    const { name, color } = updateCategory;
    if (name.length < 2) {
      return setMessageError("Название категории должно быть не меньше 1 символов");
    }
    if (!id) {
      return setMessageError("Категория не выбрана");
    }

    updateCategoryHook({ id, name, color: color ? color : "white" } as TUpDateCategory);
    setUpDateCategory({ color: "", name: "" });
  };
  // eslint-disable-next-line no-console
  if (error) console.error("UpdateCategory.tsx file", error);

  return (
    <section className={s.update_block}>
      <CategoriesList
        classNameList={s.update_list}
        classNameItem={s.update_list_item}
        classNameIcon={s.update_list_item_icon}
        icon={<FontAwesomeIcon icon={faPen} />}
        onClick={onClick}
      />

      <div className={s.update_block_new_name}>
        <span className={s.update_block_new_name_span}>Новое название</span>
        <Input
          className={s.update_block_new_name_inp}
          value={updateCategory.name}
          onChange={upDateName}
        />
      </div>
      <ColorsList state={updateCategory} setState={setUpDateCategory} />

      {messageError ? <ErrorMessage message={messageError} /> : ""}
      <Button className={s.update_block_button} onClick={onClickUpdateCategory}>
        Обновить
      </Button>
      {isLoading ? <Spinner /> : ""}
    </section>
  );
}

export default UpdateCategories;
