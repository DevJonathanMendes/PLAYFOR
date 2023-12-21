"use client";
import { axiosLogin } from "@/api/axios";
import { LoginSchemaData, loginSchema } from "@/zodSchema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Form() {
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
      {errors.root && <span className="text-black">{errors.root.message}</span>}
      <div>
        <label className="label">Username</label>
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
          className="input"
        />
        {errors.username && (
          <span className="text-black">{errors.username.message}</span>
        )}
      </div>
      <div>
        <label className="label">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          {...register("password", { required: true })}
          className="input"
        />
        {errors.password && (
          <span className="text-black">{errors.password.message}</span>
        )}
      </div>
      <div>
        <input
          value="Login"
          type="submit"
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        />
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
