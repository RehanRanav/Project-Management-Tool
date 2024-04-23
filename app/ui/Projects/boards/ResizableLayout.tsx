"use client";
import TaskPage from "@/app/ui/Projects/boards/TaskPage";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProjectInfoPanel from "@/app/ui/Projects/boards/ProjectInfoPanel";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetTask } from "@/app/redux/taskSlice";
import { Spinner } from "flowbite-react";

const ResizableLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetTask());
    };
  }, []);

  return (
    <PanelGroup autoSaveId="Tasks" direction="horizontal">
      <Panel
        minSize={1}
        maxSize={16}
        defaultSize={15}
        className="h-full overflow-y-scroll hidden lg:block"
      >
        <ProjectInfoPanel />
      </Panel>
      <PanelResizeHandle className="w-0.5 h-[510px] bg-gray-200" />
      <Panel defaultSize={85}>
        <TaskPage />
      </Panel>
    </PanelGroup>
  );
};

export default ResizableLayout;
