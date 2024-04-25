import React from "react";
import Header from "@/app/ui/Projects/ProjectHeader";
import ProjectTable from "@/app/ui/All-Projects/table";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Project List",
};

const page = async () => {
  const session = await getServerSession(authConfig);
  return (
    <>
      <Header />
      <Link href="/projects" className="lg:px-10 px-2 w-fit py-2 flex gap-1 items-center text-sm text-blue-700 hover:underline"><IoArrowBack size={16}/> Back</Link>
      <ProjectTable email={session?.user?.email || ""} />
    </>
  );
};

export default page;
