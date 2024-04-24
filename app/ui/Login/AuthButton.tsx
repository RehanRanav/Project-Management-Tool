"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const GoogleSignInButton = () => {
  const handleClick = (): void => {
    signIn("google");
  };
  return (
    <button
      className="flex w-full gap-4 justify-center h-10 items-center rounded-lg bg-black px-4 text-sm font-medium text-white transition-colors hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      onClick={handleClick}
    >
      <FcGoogle size={30} />
      <span>Continue with Google</span>
    </button>
  );
};
export default GoogleSignInButton;
