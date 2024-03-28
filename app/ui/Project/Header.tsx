import Jiralogo from "@/app/ui/Project/Jiralogo";
import TaskModal from "@/app/ui//Project/TaskModal";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";
import { Dropdown, DropdownHeader, DropdownItem } from "flowbite-react";
import LogOut from "@/app/ui/Login/LogOut";

const Header = async () => {
  const session = await getServerSession(authConfig);
  
  return (
    <div className="flex p-4 border-b items-center justify-between">
      <div className="flex items-center justify-between gap-4">
        <div className="cursor-pointer hover:bg-gray-200 p-1 rounded-sm">
          <Jiralogo />
        </div>
        <TaskModal />
      </div>
      <div className="font-medium flex items-center gap-4">
        <div>Hello, {session?.user?.name}</div>
        <div className="w-fit">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <img
                src={`${session?.user?.image}`}
                alt="Profile Pic"
                width={40}
                height={40}
                className="rounded-full"
              />
            }
          >
            <DropdownHeader>
              <div className="flex flex-col gap-2">
                <span>Account</span>
                <div className="flex items-center gap-2">
                  <img
                    src={`${session?.user?.image}`}
                    alt="Profile Pic"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <div className="flex flex-col text-xs">
                    <span>{session?.user?.name}</span>
                    <span>{session?.user?.email}</span>
                  </div>
                </div>
              </div>
            </DropdownHeader>
            <DropdownItem>
              <LogOut/>
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
