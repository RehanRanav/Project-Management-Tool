"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TaskPage from "@/app/ui/Projects/boards/TaskPage";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useParams } from "next/navigation";
import { getProjectData } from "@/app/lib/actions";
import { useDispatch } from "react-redux";
import { selectProject, setProject } from "@/app/redux/projectSlice";
import { useAppSelector } from "@/app/redux/store";

const ResizableLayout = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const project = useAppSelector(selectProject);

  useEffect(()=>{
    console.log(project);
    
  },[project])
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.id) {
          const res = await getProjectData(params.id as string);

          if (res) {
            await dispatch(setProject(res));
          }
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <PanelGroup autoSaveId="Tasks" direction="horizontal">
      <Panel minSize={1} maxSize={50} defaultSize={15}>
        <div className="flex flex-col py-2 ">
          <div className="flex gap-2 mt-4 justify-center items-center">
            <Image
              src="/assets/project-icon.svg"
              alt="Project Icon"
              width={30}
              height={30}
              className="rounded"
            />
            <span className="whitespace-nowrap ">{project.title}</span>
          </div>
        </div>
      </Panel>
      <PanelResizeHandle className="w-0.5 bg-gray-200" />
      <Panel defaultSize={85}>
        <TaskPage />
      </Panel>
    </PanelGroup>
  );
};

export default ResizableLayout;
