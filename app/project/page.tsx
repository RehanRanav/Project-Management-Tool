import { authConfig, loginIsRequiredServer } from "@/auth";
import { getServerSession } from "next-auth";
import { Metadata } from "next";
import Header from "@/app/ui/Project/ProjectHeader";
import TasksIndex from "@/app/ui/Project/TasksIndex";


export const metadata: Metadata = {
  title: "Project",
};

const Project = async () => {
  await loginIsRequiredServer();
  const session = await getServerSession(authConfig);

  return (
    <>
      <Header />
      <TasksIndex email={session?.user?.email || ""}/>
    </>
  );
};

export default Project;
