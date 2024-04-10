import ResizableLayout from "@/app/ui/Projects/boards/ResizableLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project | Board",
};

const Board = async () => {
  return (
    <>
      <ResizableLayout />
    </>
  );
};

export default Board;
