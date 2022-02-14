import React, { ReactElement, FC } from "react";
import "./Modal.scss";

interface ModalProps {
  show: boolean;
  footer?: ReactElement | string;
  children: ReactElement;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ show = false, children, onClose, footer }) => {
  const handlerOnKeyDown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handlerOnKeyDown);
    return () => document.removeEventListener("keydown", handlerOnKeyDown);
  });

  if (!show) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-content">{children}</div>
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};
export default Modal;
