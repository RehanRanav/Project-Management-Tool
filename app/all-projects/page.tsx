import React from "react";
import Header from "@/app/ui/Projects/ProjectHeader";
import ProjectTable from "../ui/All-Projects/table";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";

export const metadata: Metadata = {
    title: "All Project List",
};

const page = async() => {
  const session = await getServerSession(authConfig);
  return (
    <>
      <Header />
      <ProjectTable email={session?.user?.email || ""}/>
    </>
  );
};

export default page;
