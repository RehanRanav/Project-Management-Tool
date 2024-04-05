"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import TaskPage from "@/app/ui/Projects/boards/TaskPage";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useParams } from "next/navigation";

const ResizableLayout = () => {
  const params = useParams();
  console.log(params.id);
  useEffect(()=>{
    if(params.id){
      
    }
  },[]);
  return (
    <PanelGroup autoSaveId="Tasks" direction="horizontal">
      <Panel minSize={1} maxSize={50}>
        <div className="flex flex-col py-2 ">
          <div className="flex gap-2 mt-4 justify-center items-center">
            <Image
              src="/assets/project-icon.svg"
              alt="Project Icon"
              width={30}
              height={30}
              className="rounded"
            />
            <span className="whitespace-nowrap ">project Name</span>
          </div>
        </div>
      </Panel>
      <PanelResizeHandle className="w-0.5 bg-gray-200" />
      <Panel>
        <TaskPage />
      </Panel>
    </PanelGroup>
  );
};

export default ResizableLayout;
