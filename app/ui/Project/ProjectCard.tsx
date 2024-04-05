import { selectProject, setProject } from "@/app/redux/projectSlice";
import { useAppSelector } from "@/app/redux/store";
import { ProjectCardProps } from "@/definition";
import Image from "next/image";
import React, { useRef } from "react";
import { CiUser } from "react-icons/ci";
import { HiUserGroup } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Popover } from "flowbite-react";

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const CardRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const Project = useAppSelector(selectProject);
  const router = useRouter();

  const handleClick = async () => {
    await dispatch(setProject(project));
    router.push("/project/boards");
  };

  return (
    <div className="bg-blue-50 pt-6 rounded-sm w-fit">
      <div
        className="p-4 shadow-md bg-white hover:shadow-lg rounded-sm flex flex-col gap-4 cursor-pointer w-72"
        ref={CardRef}
        onClick={handleClick}
      >
        <div className="flex gap-2 justify-start items-center">
          <Image
            src="/assets/project-icon.svg"
            alt="Project Icon"
            width={30}
            height={30}
            className="rounded"
          />
          <div className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {project.title}
          </div>
        </div>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {project.description}
        </div>
        <div className="flex items-center justify-between gap-1">
          <Popover
            trigger="hover"
            content={
              <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                  <h3
                    id="default-popover"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    Team Members:
                  </h3>
                </div>
                {project.team.map((member,index) => (
                  <div className="px-3 py-2" key={index}>
                    <p>{member}</p>
                  </div>
                ))}
              </div>
            }
            placement="bottom-start"
          >
            <div>
              <HiUserGroup className="hover:text-blue-500" />
            </div>
          </Popover>
          <Popover
            trigger="hover"
            content={
              <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                  <h3
                    id="default-popover"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    Project Created By:
                  </h3>
                </div>
                <div className="px-3 py-2">
                  <p>{project.createdBy}</p>
                </div>
              </div>
            }
            placement="bottom-end"
          >
            <div>
              <CiUser className="hover:text-blue-500" />
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
