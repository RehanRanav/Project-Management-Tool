import { Dropdown, DropdownHeader, DropdownItem, Tooltip } from "flowbite-react";
import LogOut from "@/app/ui/Login/LogOut";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";

const UserInfo = async () => {
  const session = await getServerSession(authConfig);
  return (
    <>
    <Tooltip
    content={session?.user?.name}
    arrow={false}
    animation='duration-500'
    placement="bottom"
    >
      <div className="w-40 text-right cursor-pointer truncate">Hello, {session?.user?.name}</div>
    </Tooltip>
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
            <LogOut />
          </DropdownItem>
        </Dropdown>
      </div>
    </>
  );
};

export default UserInfo;
