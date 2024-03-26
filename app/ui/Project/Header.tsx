import React, { useState } from "react";
import Jiralogo from "@/app/ui/Project/Jiralogo";
import TaskModal from "./TaskModal";

const Header = () => {

  return (
    <div className="flex p-4 border-b items-center">
      <div className="flex items-center justify-between">
      <div className="cursor-pointer hover:bg-gray-200 p-1 rounded-sm">
        <Jiralogo/>
      </div>
      <TaskModal/>
      </div>
    </div>
  );
};

export default Header;
