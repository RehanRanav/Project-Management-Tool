import TaskPage from "@/app/ui/Project/boards/TaskPage";
import { Metadata } from "next";
import { useEffect } from "react";

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
