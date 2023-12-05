"use client";
import axiosLogin from "@/api/axios";
import { LoginSchemaData, loginSchema } from "@/zodSchema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import Label from "./components/Label";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchemaData>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginSchemaData> = async (data) => {
    const res = await axiosLogin({ ...data });

    if (!res.data) {
      return setError("root", {
        type: "manual",
        message: "The account does not exist or is incorrect.",
      });
    }

    // Precisa estar sempre validando autenticação.
    router.push("/chat");
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              {errors.root && (
                <span className="text-black">{errors.root.message}</span>
              )}
              <div>
                <Label htmlFor="username" content="Username" />
                <input
                  {...register("username", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.username && (
                  <span className="text-black">{errors.username.message}</span>
                )}
              </div>
              <div>
                <Label htmlFor="password" content="Password" />
                <input
                  {...register("password", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {errors.password && (
                <span className="text-black">{errors.password.message}</span>
              )}
              <input
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {"Don't have an account? "}
                <Link
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href="register"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
