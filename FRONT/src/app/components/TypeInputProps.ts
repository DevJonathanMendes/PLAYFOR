import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { Path, UseFormRegister, FieldErrors } from "react-hook-form";

export type InputProps = {
  type: HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  path: Path<any>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};
