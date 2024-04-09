import { Breadcrumb } from "flowbite-react";
import React from "react";

const TaskHead = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/projects">Project</Breadcrumb.Item>
        <Breadcrumb.Item>tasks</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default TaskHead;
