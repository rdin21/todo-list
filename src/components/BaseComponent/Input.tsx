import { FC, InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
}
const Input: FC<InputProps> = ({ ...props }) => {
  return <input {...props} />;
};

export default Input;
