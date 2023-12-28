"use client";
import { axiosLogin } from "@/api/axios";
import { LoginSchemaData, loginSchema } from "@/zodSchema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./input";
import InputErrors from "./inputErrors";

export default function FormLogin() {
  const router = useRouter();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaData>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginSchemaData> = async (data) => {
    const res = await axiosLogin({ ...data });

    if (!res?.data) {
      return setError("root", {
        type: "manual",
        message: "The account does not exist or is incorrect.",
      });
    }

    router.push("/chat");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
      <InputErrors errors={errors} />

      <Input
        label="Username"
        type="text"
        path="username"
        register={register}
        errors={errors}
      />
      <Input
        label="Password"
        type="password"
        path="password"
        register={register}
        errors={errors}
      />

      <div>
        <button type="submit" className="FormSubmit">
          Login
        </button>
        <p className="mt-4 text-sm font-light text-gray-500">
          {"Don't have an account? "}
          <Link
            className="font-medium text-primary-600 hover:underline"
            href="register"
          >
            Register
          </Link>
        </p>
      </div>
    </form>
  );
}
