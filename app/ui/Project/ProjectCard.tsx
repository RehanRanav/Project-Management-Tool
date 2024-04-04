import { selectProject, setProject } from "@/app/redux/projectSlice";
import { useAppSelector } from "@/app/redux/store";
import { ProjectCardProps } from "@/definition";
import { Tooltip } from "flowbite-react";
import Image from "next/image";
import React, { useRef } from "react";
import { CiUser } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const CardRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const Project = useAppSelector(selectProject);
  const router = useRouter();

  const handleClick = async () => {
    await dispatch(setProject(project));
    router.push('/project/boards')
  };


  return (
    <div
      className="p-4 shadow-md rounded-sm flex flex-col"
      ref={CardRef}
      onClick={handleClick}
    >
      <div className="flex gap-2 justify-start items-center">
        <Image
          src="/assets/project-icon.svg"
          alt="Project Icon"
          width={30}
          height={30}
        />
        <div className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {project.title}
        </div>
      </div>
      <div className="font-normal text-gray-700 dark:text-gray-400">
        {project.description}
      </div>
      <Tooltip content="owner" placement="bottom">
        <div className="flex items-center justify-center gap-1">
          <CiUser />
          <span>{project.createdBy}</span>
        </div>
      </Tooltip>
    </div>
  );
};

export default ProjectCard;
