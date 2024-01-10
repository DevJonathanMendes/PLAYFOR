"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="h-full bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              What do you want?
            </h1>
            <div className="flex flex-col">
              <div>
                <button
                  onClick={() => router.push("/login")}
                  className="ButtonDefault"
                >
                  Login
                </button>
              </div>
              <div>
                <button
                  onClick={() => router.push("/register")}
                  className="ButtonDefault"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
