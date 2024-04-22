"use client";
import {
  getAllProjectsData,
  getUserData,
} from "@/app/lib/actions";
import {
  EmailObj,
  ProjectData,
  ProjectPageProps,
  UserData,
} from "@/definition";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import CreateProjectBtn from "@/app/ui/CreateProjectBtn";
import ProjectDeleteModal from "@/app/ui/ProjectDeleteModal";

const ProjectTable: React.FC<ProjectPageProps> = ({ email }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [userData, setUserData] = useState<UserData[] | []>([]);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [openModal, setOpenModal] = useState(false);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);

  useEffect(() => {
    const getData = getAllProjectsData(setProjects, email);
    return () => getData;
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (projects) {
        const promises = projects.map(async (project) => {
          const user = await getUserData(project.projectdata.createdBy);
          return user;
        });
        const userDataArray = await Promise.all(promises);
        setUserData(userDataArray);
      }
    };
    fetchUserData();
    setFilteredProjects(projects);
  }, [projects]);

  const openDeleteModal = (projectData: ProjectData) => {
    setOpenModal(true);
    setProjectData(projectData)
  };

  const debounceFunc = (fn: Function, delay: number) => {
    let timer: NodeJS.Timeout;

    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn();
      }, delay);
    };
  };

  const filterdata = () => {
    let input = searchRef.current?.value?.trim()?.toLowerCase() || "";
    if (input) {
      const TempProjectData: React.SetStateAction<any[]> = [];

      projects.forEach((project) => {
        if (project.projectdata.title.toLowerCase().includes(input)) {
          TempProjectData.push(project);
        }
      });
      setFilteredProjects(TempProjectData);
    } else {
      setFilteredProjects(projects);
    }
  };

  const searchTask = debounceFunc(filterdata, 800);

  return (
    <div className="lg:px-10 px-2 py-2">
      <div className="w-full pb-4 flex justify-between">
        <input
          ref={searchRef}
          type="search"
          id="default-search"
          placeholder="Search..."
          className="p-1.5 text-sm text-gray-900 border border-gray-300 rounded-sm bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={searchTask}
        />
        <CreateProjectBtn email={email} />
      </div>
      <div className="font-semibold grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_1fr)_60px] p-2 border-b bg-gray-200">
        <div>Project Name</div>
        <div>DeadLine</div>
        <div>Created By</div>
        <div>Actions</div>
      </div>
      {projects.length > 0 &&
        filteredProjects
          .filter(
            (project) =>
              project.projectdata.createdBy === email ||
              project.projectdata.team.some(
                (member: EmailObj) =>
                  member.email === email && member.approval === true
              )
          )
          .map((project, index) => (
            <div
              className="grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_1fr)_20px] p-2 hover:bg-gray-100"
              key={index}
            >
              <Link
                href={`projects/${project.projectdata.id}`}
                className="text-blue-700 cursor-pointer hover:underline-offset-4 hover:underline"
              >
                {project.projectdata.title}
              </Link>
              <div>{project.projectdata.date}</div>
              <div>
                {
                  <div className="flex gap-2 items-center">
                    <img
                      src={
                        userData.find(
                          (user) => user.email === project.projectdata.createdBy
                        )?.image
                      }
                      alt="Profile"
                      className="h-6 w-6 rounded-full"
                    />
                    <span>
                      {
                        userData.find(
                          (user) => user.email === project.projectdata.createdBy
                        )?.name
                      }
                    </span>
                  </div>
                }
              </div>
              <div>
                {project.projectdata.createdBy == email && (
                  <>
                    <button
                      className="w-fit p-1 rounded-md text-red-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => openDeleteModal(project.projectdata)}
                    >
                      <MdDelete size={20} />
                    </button>

                    <ProjectDeleteModal
                      projectData={projectData}
                      setOpenModal={setOpenModal}
                      openModal={openModal}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
    </div>
  );
};

export default ProjectTable;
