import { authConfig, loginIsRequiredServer } from "@/auth";
import { getServerSession } from "next-auth";
import { Metadata } from "next";
import Header from "@/app/ui/Projects/ProjectHeader";
import ProjectIndex from "@/app/ui/Projects/ProjectIndex";
import ProjectModal from "@/app/ui/Projects/ProjectModal";

export const metadata: Metadata = {
  title: "Project",
};

const Project = async () => {
  await loginIsRequiredServer();
  const session = await getServerSession(authConfig);

  return (
    <>
      <Header />
      <div className="flex flex-wrap gap-8 p-4">
        <ProjectModal email={session?.user?.email || ""} />
        <ProjectIndex email={session?.user?.email || ""} />
      </div>
    </>
  );
};

export default Project;
