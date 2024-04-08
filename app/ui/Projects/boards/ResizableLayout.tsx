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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.id) {
          const res = await getProjectData(params.id as string);

          console.log(res);
          
          // if (res) {
          //   await dispatch(setProject(res));
          // }
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <PanelGroup autoSaveId="Tasks" direction="horizontal">
      <Panel minSize={1} maxSize={16} defaultSize={15}>
        <div className="flex flex-col gap-2 text-base">
          <div className="flex gap-2 p-4 mt-4 justify-start items-center bg-gray-100">
            <Image
              src="/assets/project-icon.svg"
              alt="Project Icon"
              width={30}
              height={30}
              className="rounded"
            />
            <span className="whitespace-nowrap font-semibold">
              {project.title}
            </span>
          </div>
          <div className="p-2 flex flex-col gap-2 m-0.5 rounded text-sm">
            <div className="flex flex-col gap-1">
              <span className="font-medium">Project Description:</span>
              <div className="bg-gray-100 h-24 rounded p-1 overflow-y-scroll">
                {project.description}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-medium">CreatedBy:</span>
              <div className="bg-gray-100 rounded p-1">
                {project.createdBy}
              </div>
            </div>
            <div></div>
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
