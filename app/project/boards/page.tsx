import { authConfig, loginIsRequiredServer } from "@/auth";
import { getServerSession } from "next-auth";
import Header from "@/app/ui/Project/boards/BoardHeader";
import TaskPage from "@/app/ui/Project/boards/TaskPage";
import { Metadata } from "next";

export const metadata: Metadata={
  title: "Project | Board"
}

const Board = async () => {

  return (
    <>
      <TaskPage />
    </>
  );
};

export default Board;
