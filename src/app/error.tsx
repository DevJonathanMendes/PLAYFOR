"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative z-10 bg-primary py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[400px] text-center">
              <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                Error
              </h2>
              <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                Oops!
              </h4>
              <p className="mb-8 text-lg text-white">Something went wrong</p>
              <Link
                href="/"
                className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-slate-500 hover:text-primary"
              >
                Go To Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
