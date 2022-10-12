import React, { ReactElement, memo, useEffect } from "react";
import s from "./Modal.module.scss";

interface ModalProps {
  show: boolean;
  header?: ReactElement | string;
  footer?: ReactElement | string;
  children: ReactElement;
  onClose: () => void;
}

function Modal({
  show = false,
  children,
  onClose,
  footer,
  header,
}: ModalProps): JSX.Element | null {
  const handlerOnKeyDown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handlerOnKeyDown);
    return () => document.removeEventListener("keydown", handlerOnKeyDown);
  });

  if (!show) return null;

  return (
    <div className={s.modal} onClick={onClose}>
      <div className={s.modal_dialog} onClick={(e) => e.stopPropagation()}>
        <div className={s.modal_header}>
          {header && <div className={s.modal_footer}>{header}</div>}
          <span className={s.modal_close} onClick={onClose}>
            &times;
          </span>
        </div>
        <div className={s.modal_body}>
          <div className={s.modal_content}>{children}</div>
        </div>
        {footer && <div className={s.modal_footer}>{footer}</div>}
      </div>
    </div>
  );
}
export default memo(Modal);
