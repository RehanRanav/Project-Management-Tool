import { ProjectCardProps, UserData } from "@/definition";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineWatchLater, MdDelete } from "react-icons/md";
import { differenceInDays } from "@/app/lib/utils";
import { getUserData } from "@/app/lib/actions";
import { Tooltip } from "flowbite-react";
import ProjectDeleteModal from "@/app/ui/ProjectDeleteModal";

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  email,
  ClickFunction,
}) => {
  const [deadlineLabel, setDeadlineLabel] = useState("");
  const CardRef = useRef<HTMLDivElement | null>(null);
  const [userData, setUserData] = useState<UserData>({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (project) {
      const difference = differenceInDays(project.date);
      if (difference < 0) {
        setDeadlineLabel("overdue");
      } else {
        setDeadlineLabel(`${difference != 0 ? difference : 'one'} day(s) left`);
      }
    }
    const fetchUserData = async () => {
      if (project.createdBy) {
        const user = await getUserData(project.createdBy);
        setUserData(user);
      }
    };
    fetchUserData();
  }, [project]);

  const handleDeleteBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setOpenModal(true);
  };

  return (
    <div
      className="group px-3 py-2 shadow-sm shadow-gray-300 bg-white hover:shadow-md border rounded-sm flex flex-col justify-between cursor-pointer w-52 h-40 max-w-52 max-h-48 select-none"
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
            className="rounded w-6 h-6"
          />
          {project.createdBy == email && (
            <button
              className="w-fit p-1 group-hover:opacity-100 opacity-0 rounded-md text-red-700 hover:bg-gray-100"
              onClick={handleDeleteBtnClick}
            >
              <MdDelete size={20} />
            </button>
          )}
          <ProjectDeleteModal
            projectData={project}
            setOpenModal={setOpenModal}
            openModal={openModal}
          />
        </div>
        <div className="text-base font-bold tracking-tight text-blue-600 truncate w-full">
          {project.title}
        </div>
      </div>
      <div className="font-normal text-xs text-gray-700 rounded-sm p-0.5 dark:text-gray-400 h-10 bg-slate-50 leading-relaxed line-clamp-2">
        {project.description}
      </div>
      <div className="flex justify-between items-end">
        <div
          className={`text-xs flex gap-2 items-center w-fit p-0.5 rounded ${
            deadlineLabel != "overdue" ? "" : "text-red-700"
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
            className="text-[10px]"
          >
            <Image
              src={userData.image || "/assets/default-profile.svg"}
              alt="Profile"
              width={24}
              height={24}
              className="h-6 w-6 rounded-full"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
