import "./BaseComponent.scss";
import { ButtonHTMLAttributes, ReactNode } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  children: ReactNode;
  isLoading?: boolean;
}
function Input({ isLoading = false, children, ...props }: ButtonProps): JSX.Element {
  return (
    <button
      {...props}
      style={{
        opacity: isLoading ? 0.3 : 1,
        pointerEvents: isLoading ? "none" : "inherit",
      }}
    >
      <span className={isLoading ? "spinner" : ""}></span>
      {children}
    </button>
  );
}

export default Input;
