import { InputProps } from "./TypeInputProps";
import InputErrors from "./inputErrors";

export default function Input({
  label,
  type,
  placeholder,
  path,
  register,
  errors,
}: InputProps) {
  return (
    <div>
      <label className="FormLabel">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(path, { required: true })}
        className="FormInput"
      />
      <InputErrors error={errors[path]} />
    </div>
  );
}
