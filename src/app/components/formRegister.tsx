"use client";
import { axiosRegister } from "@/api/axios";
import { RegisterSchemaData, registerSchema } from "@/zodSchema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./input";
import InputErrors from "./inputErrors";

export default function FormRegister() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterSchemaData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaData> = async (data) => {
    const res = await axiosRegister({ ...data });

    if (!res.data) {
      return setError("root", {
        type: "manual",
        message: "Email or password already exists.",
      });
    }

    // Precisa estar sempre validando autenticação.
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
        label="Email"
        type="email"
        path="email"
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
      <Input
        placeholder="Confirm Password"
        type="password"
        path="confirm_password"
        register={register}
        errors={errors}
      />
      <div>
        <button type="submit" className="ButtonDefault">
          Create account
        </button>

        <p className="mt-4 text-sm font-light text-gray-500">
          {"Already have an account? "}
          <Link
            className="font-medium text-primary-600 hover:underline"
            href="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
