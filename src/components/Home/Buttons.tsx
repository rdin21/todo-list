import React, { memo } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../UI/BaseComponent";
import s from "./Home.module.scss";

interface IButtonsProps {
  setCreateTask: (bool: boolean) => void;
  setCreateCategory: (bool: boolean) => void;
  setDeleteCategory: (bool: boolean) => void;
  setUpDateCategory: (bool: boolean) => void;
}

function Buttons({
  setCreateTask,
  setCreateCategory,
  // setDeleteCategory,
  setUpDateCategory,
}: IButtonsProps): JSX.Element {
  return (
    <div>
      {" "}
      <ul className={s.create_buttons}>
        <li>
          <Button
            onClick={() => setCreateTask(true)}
            className={classNames(s.create_buttons_btn, s.plus_btn)}
          >
            <FontAwesomeIcon icon={faPlus} className={s.create_buttons_btn_icon} />
            задачу
          </Button>
        </li>
        <li>
          <Button
            onClick={() => setCreateCategory(true)}
            className={classNames(s.create_buttons_btn, s.plus_btn)}
          >
            <FontAwesomeIcon icon={faPlus} className={s.create_buttons_btn_icon} />
            категорию
          </Button>
        </li>
        <li>
          {/* <Button
            onClick={() => setDeleteCategory(true)}
            className={classNames(s.create_buttons_btn, s.plus_btn)}
          >
            <FontAwesomeIcon icon={faTrash} className={s.create_buttons_btn_icon} />
            категорию
          </Button> */}
        </li>
        <li>
          <Button
            onClick={() => setUpDateCategory(true)}
            className={classNames(s.create_buttons_btn, s.plus_btn)}
          >
            {/* <FontAwesomeIcon icon={faTrash} className={s.create_buttons_btn_icon} /> */}
            обновить категорию
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default memo(Buttons);
