"use client";
import { HiAtSymbol, HiOutlineKey, HiArrowNarrowRight } from "react-icons/hi";
import { Button } from "@/app/ui/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const signInResponse = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/project");
    } else {
      setError("Your Email or Password is wrong!");
    }
  };

  return (
    <form className="space-y-3 mt-8" onSubmit={handleSubmit}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        {error && (
          <div className="p-2 mb-2 rounded w-full text-white bg-red-500">
            {error}
          </div>
        )}
        <h1 className={`mb-3 text-2xl`}>Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <HiAtSymbol className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <HiOutlineKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <LoginButton />
      </div>
    </form>
  );
};

function LoginButton() {
  return (
    <Button className="mt-4 w-full">
      Log in <HiArrowNarrowRight className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

export default LoginForm;
