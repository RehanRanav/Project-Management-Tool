import { authConfig, loginIsRequiredServer } from "@/auth";
import { getServerSession } from "next-auth";
import { Metadata } from "next";
import Header from "@/app/ui/Project/ProjectHeader";
import ProjectModal from "@/app/ui/Project/ProjectModal";

export const metadata: Metadata={
  title: "Project"
}

const Project = async () => {
  await loginIsRequiredServer();
  const session = await getServerSession(authConfig);
  console.log(session);

  return (
    <>
    <Header/>
    <ProjectModal/>
    </>
  );
};

export default Project;
