import Header from "@/app/ui/Projects/boards/BoardHeader";
import { ReactNode } from "react";

export default function ProjectLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
