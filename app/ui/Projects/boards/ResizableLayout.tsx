"use client";
import TaskPage from "@/app/ui/Projects/boards/TaskPage";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProjectInfoPanel from "@/app/ui/Projects/boards/ProjectInfoPanel";
import { Suspense } from "react";

const ResizableLayout = () => {
  return (
    <PanelGroup autoSaveId="Tasks" direction="horizontal">
      <Panel
        minSize={1}
        maxSize={16}
        defaultSize={15}
        className="max-h-[900px] h-full overflow-y-scroll hidden lg:block"
      >
        <ProjectInfoPanel />
      </Panel>
      <PanelResizeHandle className="w-0.5 bg-gray-200" />
      <Panel defaultSize={85}>
        <TaskPage />
      </Panel>
    </PanelGroup>
  );
};

export default ResizableLayout;
