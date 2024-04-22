import Header from "@/app/ui/Projects/boards/BoardHeader";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
}
