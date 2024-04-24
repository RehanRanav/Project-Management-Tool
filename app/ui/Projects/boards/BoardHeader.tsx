import Jiralogo from "@/app/ui/Projects/Jiralogo";
import UserInfo from "@/app/ui/Projects/UserInfo";
import CreateTaskBtn from "@/app/ui/Projects/boards/CreateTaskBtn";
import ProjectDropdownBtn from "@/app/ui/Projects/boards/ProjectDropdownBtn";
import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";

const Header = async () => {
  const session = await getServerSession(authConfig);

  return (
    <div className="flex p-4 border-b items-center justify-between">
      <div className="flex items-center justify-between gap-4">
        <div className="cursor-pointer hover:bg-gray-100 p-1 rounded-sm lg:block hidden">
          <Jiralogo />
        </div>
        <CreateTaskBtn />
        <ProjectDropdownBtn email={session?.user?.email || ""} />
      </div>
      <div className="font-medium flex items-center gap-4">
        <UserInfo />
      </div>
    </div>
  );
};

export default Header;
