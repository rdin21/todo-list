import classNames from "classnames";
import React, { ReactElement } from "react";
import s from "./DropDownMenu.module.scss";

interface IDropDownMenuProps {
  setShowDropDown: (show: boolean) => void;
  showDropDown: boolean;
  children: ReactElement;
}

const DropDownMenu = ({ showDropDown, children }: IDropDownMenuProps): JSX.Element => {
  return (
    <>
      <div className={classNames(s.drop_down_menu, showDropDown ? s.show : s.hide)}>{children}</div>
    </>
  );
};

export default DropDownMenu;
