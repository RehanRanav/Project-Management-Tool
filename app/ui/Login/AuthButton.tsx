'use client'
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const GoogleSignInButton = () => {
  const handleClick = (): void => {
    signIn("google");
  };
  return (
    <button className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
    onClick={handleClick}>
        <FcGoogle size={30}/> 
        <span>Continue with Google</span>
    </button>
  );
};
export default GoogleSignInButton;
