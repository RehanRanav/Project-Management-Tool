import Jiralogo from "@/app/ui/Projects/Jiralogo";
import TaskModal from "@/app/ui/Projects/boards/TaskModal";
import UserInfo from "../UserInfo";

const Header = () => {
  return (
    <div className="flex p-4 border-b items-center justify-between">
      <div className="flex items-center justify-between gap-4">
        <div className="cursor-pointer hover:bg-gray-200 p-1 rounded-sm">
          <Jiralogo />
        </div>
        <TaskModal />
      </div>
      <div className="font-medium flex items-center gap-4">
        <UserInfo />
      </div>
    </div>
  );
};

export default Header;
