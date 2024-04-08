import { setProject } from "@/app/redux/projectSlice";
import { ProjectCardProps } from "@/definition";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { differenceInDays } from "@/app/lib/utils";

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [deadlineLabel, setDeadlineLabel] = useState("");
  const CardRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (project) {
      const difference = differenceInDays(project.date);
      if (difference <= 0) {
        setDeadlineLabel("overdue");
      } else {
        setDeadlineLabel(`${difference} days left`);
      }
    }
  }, []);
  const handleClick = async () => {
    await dispatch(setProject(project));
    router.push(`/projects/${project.id}`);
  };

  return (
    <div
      className="p-4 shadow-sm shadow-gray-300 bg-white hover:shadow-md rounded-sm flex flex-col gap-3 cursor-pointer w-72"
      ref={CardRef}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-2 justify-start items-start">
        <Image
          src="/assets/project-icon.svg"
          alt="Project Icon"
          width={24}
          height={24}
          className="rounded"
        />
        <div className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
          {project.title}
        </div>
      </div>
      <div className="font-normal text-xs text-gray-700 dark:text-gray-400 h-14 line-clamp-3 leading-relaxed">
        {project.description}
      </div>
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
    </div>
  );
};

export default ProjectCard;
