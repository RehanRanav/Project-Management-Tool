import { setProject } from "@/app/redux/projectSlice";
import { ProjectCardProps, UserData } from "@/definition";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineWatchLater, MdDelete } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { differenceInDays } from "@/app/lib/utils";
import { deleteProjectFromFirbase, getUserData } from "@/app/lib/actions";
import {
  Dropdown,
  DropdownItem,
  Tooltip,
} from "flowbite-react";

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  email,
  ClickFunction,
}) => {
  const [deadlineLabel, setDeadlineLabel] = useState("");
  const CardRef = useRef<HTMLDivElement | null>(null);
  const [userData, setUserData] = useState<UserData>({});

  useEffect(() => {
    if (project) {
      const difference = differenceInDays(project.date);
      if (difference <= 0) {
        setDeadlineLabel("overdue");
      } else {
        setDeadlineLabel(`${difference} days left`);
      }
    }
    const fetchUserData = async () => {
      if (project.createdBy) {
        const user = await getUserData(project.createdBy);
        setUserData(user);
      }
    };
    fetchUserData();
  }, []);

  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const deleteProject = async (id:string)=>{
    const res= await deleteProjectFromFirbase(id);
  }

  return (
    <div
      className="p-4 shadow-sm shadow-gray-300 bg-white hover:shadow-md rounded-sm flex flex-col gap-3 cursor-pointer min-w-72"
      ref={CardRef}
      onClick={ClickFunction}
    >
      <div className="flex flex-col gap-2 justify-start items-start">
        <div className="flex justify-between w-full">
          <Image
            src="/assets/project-icon.svg"
            alt="Project Icon"
            width={24}
            height={24}
            className="rounded"
          />
          {project.createdBy == email && (
            <div
              className="p-2 hover:bg-gray-100 rounded-sm"
              onClick={handleMenuClick}
            >
              <Dropdown arrowIcon={false} inline label={<HiDotsHorizontal />}>
                <DropdownItem onClick={()=>deleteProject(project.id as string)}>
                  <MdDelete size={20} /> Delete project
                </DropdownItem>
              </Dropdown>
            </div>
          )}
        </div>
        <div className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
          {project.title}
        </div>
      </div>
      <div className="font-normal text-xs text-gray-700 rounded-sm p-0.5 dark:text-gray-400 h-14 line-clamp-3 leading-relaxed">
        {project.description}
      </div>
      <div className="flex justify-between">
        <div
          className={`text-xs flex gap-2 items-center w-fit p-0.5 rounded ${
            deadlineLabel != "overdue" ? "bg-gray-100" : "bg-red-100"
          }`}
        >
          <span>
            <MdOutlineWatchLater />
          </span>
          <span>{deadlineLabel}</span>
        </div>
        <div>
          <Tooltip
            content={`Created By: ${userData.name}`}
            placement="left"
            className="text-xs"
          >
            <img
              src={userData.image}
              alt="Profile"
              className="h-7 w-7 rounded-md"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
