import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
}

function Input({ ...props }: InputProps): JSX.Element {
  return <input {...props} />;
}

export default Input;
