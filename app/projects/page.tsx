import { authConfig, loginIsRequiredServer } from "@/auth";
import { getServerSession } from "next-auth";
import { Metadata } from "next";
import Header from "@/app/ui/Projects/ProjectHeader";
import ProjectIndex from "@/app/ui/Projects/ProjectIndex";
import RequestedProject from "@/app/ui/Projects/RequestedProject";

export const metadata: Metadata = {
  title: "Project",
};

const Project = async () => {
  await loginIsRequiredServer();
  const session = await getServerSession(authConfig);

  return (
    <>
      <Header />
        <ProjectIndex email={session?.user?.email || ""} />
      <RequestedProject email={session?.user?.email || ""} />
    </>
  );
};

export default Project;
