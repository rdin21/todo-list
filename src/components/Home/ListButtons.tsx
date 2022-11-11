import React, { memo, useState } from "react";
import CreateCategories from "../Categories/CreateCategories";
// import DeleteCategories from "../Categories/DeleteCategories";
import UpdateCategories from "../Categories/UpdateCategories";
import { Button } from "../UI/BaseComponent";
import Modal from "../UI/Modal/Modal";
import s from "./Home.module.scss";
function ListButtons(): JSX.Element {
  const [createCategory, setCreateCategory] = useState<boolean>(false);
  // const [deleteCategory, setDeleteCategory] = useState<boolean>(false);
  const [upDateCategory, setUpDateCategory] = useState<boolean>(false);

  const onCloseCategoryModel = (): void => setCreateCategory(false);
  // const onCloseDeleteCategoryModel = (): void => setDeleteCategory(false);
  const onCloseUpDateCategoryModel = (): void => setUpDateCategory(false);
  return (
    <>
      <ul className={s.list_buttons}>
        <li>
          <Button className={s.list_buttons_btn} onClick={() => setCreateCategory(true)}>
            добавить категорию
          </Button>
        </li>
        <li>
          <Button className={s.list_buttons_btn} onClick={() => setUpDateCategory(true)}>
            обновить категорию
          </Button>
        </li>
        <li>
          {/* <Button className={s.list_buttons_btn} onClick={() => setDeleteCategory(true)}>
            удалить категорию
          </Button> */}
        </li>
      </ul>

      <Modal show={createCategory} onClose={onCloseCategoryModel}>
        <CreateCategories onCloseCategoryModel={onCloseCategoryModel} />
      </Modal>
      {/* <Modal show={deleteCategory} onClose={onCloseDeleteCategoryModel}>
        <DeleteCategories />
      </Modal> */}
      <Modal show={upDateCategory} onClose={onCloseUpDateCategoryModel}>
        <UpdateCategories />
      </Modal>
    </>
  );
}

export default memo(ListButtons);
