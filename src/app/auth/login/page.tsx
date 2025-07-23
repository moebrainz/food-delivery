"use client";

import Google from "@/app/components/icons/Google";
import { registerSchema } from "@/app/libs/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof registerSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [getError, setGetError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const onSubmit = async (data: FormData) => {
  //   try {
  //     setIsLoading(true);
  //     setIsError(false);
  //     setIsRegistered(false);

  //     const res = await fetch("api/auth", {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     const result = await res.json();

  //     if (!res.ok) {
  //       setIsError(true);
  //       // show error from backend
  //       setGetError(result.error);
  //       setIsRegistered(false);
  //     } else {
  //       // success logic
  //       setIsError(false);
  //       setIsRegistered(true);
  //       // show error from backend
  //     }
  //   } catch (err) {
  //     // console.error("Fetch error:", err);
  //     setIsError(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      ...data,
      callbackUrl: "/",
    });

    console.log(result);

    if (!result?.ok) {
      // show user-facing error
      setIsLoading(false);
      setIsError(true);
      setGetError("Invalid email or password");
    }
    if (result?.ok) {
      setIsLoading(false);
      setIsError(false);
      setGetError("");
      router.push("/");
    }
  };
  return (
    <section className="">
      <h1 className="text-primary text-center text-2xl font-semibold">Login</h1>

      <div>
        <form
          action="
            "
          onSubmit={handleSubmit(onSubmit)}
          className="block max-w-xs mx-auto space-y-2"
        >
          {isError && (
            <span className="bg-red-100 text-red-600 p-2 w-full block text-center mx-auto mt-2">
              {getError}
            </span>
          )}
          {isRegistered && (
            <span className="bg-green-100 text-green-600 p-2 w-full block text-center mx-auto mt-2 ">
              Login Successfull
            </span>
          )}
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            disabled={isLoading}
          />
          {errors.email && (
            <span className=" text-red-400 text-sm font-semibold text-center rounded-lg w-full block m-auto">
              {errors.email.message}
            </span>
          )}
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            disabled={isLoading}
          />
          {errors.password && (
            <span className="text-red-400 text-sm font-semibold text-center rounded-lg w-full mb-3 block m-auto">
              {errors.password.message}
            </span>
          )}
          <button type="submit" className="mt-4" disabled={isLoading}>
            {isLoading ? "Logging In..." : "Login"}
          </button>
          <div>
            <h6 className="text-center text-gray-500 font-medium text-sm">
              or login with provider
            </h6>
          </div>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="text-gray-700 flex items-center gap-4"
          >
            <Google />
            Login with google
          </button>

          <div>
            <h6 className="text-sm text-gray-600 font-semibold text-center">
              Don&#39;t have an account?{" "}
              <Link
                href="/auth/register"
                className="underline cursor-pointer text-primary"
              >
                register
              </Link>
            </h6>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
