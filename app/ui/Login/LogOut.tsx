"use client";
import React from "react";
import { HiLogout } from "react-icons/hi";
import { redirect, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const LogOut = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <div
      className="flex gap-2 items-center text-base font-normal"
      onClick={handleSignOut}
    >
      <HiLogout size={30} />
      Log Out
    </div>
  );
};

export default LogOut;
