import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
}

function Input2({ ...props }: InputProps): JSX.Element {
  return <input {...props} />;
}

export default Input2;
