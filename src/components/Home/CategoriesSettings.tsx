import React, { memo, useState } from "react";
import gear from "../../images/icons/gear.svg";
import { Button } from "../UI/BaseComponent";
import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import s from "./Home.module.scss";
import ListButtons from "./ListButtons";

function CategoriesSettings(): JSX.Element {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const onClickShowDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div className={s.categories_settings}>
      <Button className={s.categories_settings_btn} title="Настройка" onClick={onClickShowDropDown}>
        <img className={s.categories_settings_btn_icon} src={gear} />
      </Button>
      <DropDownMenu showDropDown={showDropDown} setShowDropDown={setShowDropDown}>
        <ListButtons />
      </DropDownMenu>
    </div>
  );
}

export default memo(CategoriesSettings);
