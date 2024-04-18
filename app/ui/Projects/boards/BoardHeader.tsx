import Jiralogo from "@/app/ui/Projects/Jiralogo";
import UserInfo from "@/app/ui/Projects/UserInfo";
import CreateTaskBtn from "@/app/ui/Projects/boards/CreateTaskBtn";

const Header = () => {
  return (
    <div className="flex p-4 border-b items-center justify-between">
      <div className="flex items-center justify-between gap-4">
        <div className="cursor-pointer hover:bg-gray-200 p-1 rounded-sm">
          <Jiralogo />
        </div>
        <CreateTaskBtn />
      </div>
      <div className="font-medium flex items-center gap-4">
        <UserInfo />
      </div>
    </div>
  );
};

export default Header;
