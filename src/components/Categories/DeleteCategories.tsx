import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./Categories.module.scss";
import { categoriesApi } from "../../service/categoriesService";
import CategoriesList from "./CategoriesList";
import Spinner from "../Preloader/Spinner";

export default function DeleteCategories(): JSX.Element {
  const [deleteCategories, { error, isLoading }] = categoriesApi.useDeleteCategoriesMutation();

  const onClick = (id: number) => deleteCategories(id);

  // eslint-disable-next-line no-console
  if (error) console.log("DeleteCategories-DELETE", error);

  return (
    <section className={s.delete_block}>
      <h3 className={s.block_title}>Удолить категорию</h3>
      <i>Нажмите 2 раза чтобы удалить категорию.</i>
      <CategoriesList
        classNameList={s.delete_list}
        classNameItem={s.list_item}
        classNameIcon={s.list_item_delete_icon}
        icon={<FontAwesomeIcon icon={faTrash} />}
        onClick={onClick}
      />
      {isLoading ? <Spinner text="Идет удаление..." spinnerBlock={s.spinner_delete} /> : ""}
    </section>
  );
}
