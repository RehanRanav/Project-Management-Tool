"use client";
import React from "react";
import { HiLogout } from "react-icons/hi";
import { signOut } from "next-auth/react";

const LogOut = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <div
      className="flex w-full gap-2 items-center text-base font-normal"
      onClick={handleSignOut}
    >
      <HiLogout size={30} />
      Log Out
    </div>
  );
};

export default LogOut;
