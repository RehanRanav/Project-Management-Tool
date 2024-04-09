import { setProject } from "@/app/redux/projectSlice";
import { ProjectCardProps, UserData } from "@/definition";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { differenceInDays } from "@/app/lib/utils";
import { getUserData } from "@/app/lib/actions";
import {
  CustomFlowbiteTheme,
  Dropdown,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";

const ProjectCard: React.FC<ProjectCardProps> = ({ project, email, ClickFunction }) => {
  const [deadlineLabel, setDeadlineLabel] = useState("");
  const CardRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
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

  const handleMenuClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const customtheme: CustomFlowbiteTheme["dropdown"] = {
    inlineWrapper: "flex item-center z-50",
  };

  return (
    <div
      className="p-4 shadow-sm shadow-gray-300 bg-white hover:shadow-md rounded-sm flex flex-col gap-3 cursor-pointer w-72"
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
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className="p-2 hover:bg-gray-100 rounded-sm">
                  <HiDotsHorizontal />
                </div>
              }
              onClick={handleMenuClick}
              theme={customtheme}
            >
              <DropdownItem>Delete</DropdownItem>
            </Dropdown>
          )}
        </div>
        <div className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
          {project.title}
        </div>
      </div>
      <div className="font-normal text-xs text-gray-700 dark:text-gray-400 h-14 line-clamp-3 leading-relaxed">
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
          <img
            src={userData.image}
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
