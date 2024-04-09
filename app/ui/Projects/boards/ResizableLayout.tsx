"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TaskPage from "@/app/ui/Projects/boards/TaskPage";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useParams } from "next/navigation";
import { getProjectData } from "@/app/lib/actions";
import { useDispatch } from "react-redux";
import { selectProject, setProject } from "@/app/redux/projectSlice";
import { useAppSelector } from "@/app/redux/store";
import { UserData } from "@/definition";
import { IoIosArrowDown } from "react-icons/io";

const ResizableLayout = () => {
  const [userdata, setUserdata] = useState<UserData>({});
  const [isDescriptionOverflowed, setIsDescriptionOverflowed] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const project = useAppSelector(selectProject);
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const expandBtnRef = useRef<HTMLButtonElement | null>(null);
  const [expandToggle, setExpandToggle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.id) {
          const res = await getProjectData(params.id as string);

          if (res) {
            await dispatch(setProject(res.projectdata));
            setUserdata(res.userdata);
          }
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (
      descriptionRef.current &&
      descriptionRef.current?.scrollHeight >
        descriptionRef.current?.clientHeight
    ) {
      setIsDescriptionOverflowed(true);
    }
  }, [project]);

  const handleDescriptionHeight = () => {
    const Btnelement = expandBtnRef.current;
    const Descriptionelement = descriptionRef.current;
    if (Descriptionelement && Btnelement) {
      setExpandToggle(!expandToggle);
      const rotateDeg = expandToggle ? "0deg" : "180deg";
      Btnelement.style.transform = `rotate(${rotateDeg})`;
    }
  };

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
          <div className="p-2 flex flex-col gap-4 m-0.5 rounded text-sm">
            <div className="flex flex-col gap-1">
              <span className="font-medium">Project Description:</span>
              <div
                className={`bg-gray-100 h-20 rounded p-1 line-clamp-4 leading-relaxed text-xs relative
                ${expandToggle ? "h-52 line-clamp-none" : "h-20"}`}
                ref={descriptionRef}
              >
                {project.description}
                {isDescriptionOverflowed && (
                  <button
                    className={`text-sm bg-transparent absolute right-1 bottom-0 transition-all ease-in-out duration-700`}
                    onClick={handleDescriptionHeight}
                    ref={expandBtnRef}
                    title="view more"
                  >
                    <IoIosArrowDown />
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-medium">CreatedBy:</span>
              <div className="bg-gray-100 rounded p-1 flex items-center gap-2 cursor-pointer">
                <img
                  src={userdata.image}
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
                <span>{userdata.name}</span>
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
