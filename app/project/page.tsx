import { authConfig, loginIsRequiredServer } from "@/auth";
import { getServerSession } from "next-auth";
import Header from "@/app/ui/Project/Header";
import TaskPage from "@/app/ui/Project/TaskPage";

const Project = async () => {
  await loginIsRequiredServer();
  const session = await getServerSession(authConfig);
  console.log(session);

  return (
    <>
      <Header />
      <TaskPage />
    </>
  );
};

export default Project;
