import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

type InputProps = {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  errors?: FieldErrors<any>;
};

const Span = ({ message }: any) => (
  <span className="text-black text-sm">{message}</span>
);

export default function InputErrors({ error, errors }: InputProps) {
  if (error) {
    return <Span message={error.message} />;
  }

  if (errors?.root) {
    return <Span message={errors.root.message} />;
  }
}
