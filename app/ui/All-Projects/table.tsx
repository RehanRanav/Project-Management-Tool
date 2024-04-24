"use client";
import { getAllProjectsData, getUserData } from "@/app/lib/actions";
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
import { Table } from "flowbite-react";
import Image from "next/image";

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
  }, [email]);

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
    setProjectData(projectData);
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
          className="p-1 w-56 text-xs text-gray-900 border border-gray-300 rounded-md bg-white focus:ring-cyan-600 focus:border-cyan-600 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={searchTask}
        />
        <CreateProjectBtn email={email} />
      </div>
      <div className="overflow-x-auto">
        <Table striped hoverable>
          <Table.Head>
            <Table.HeadCell>Project Name</Table.HeadCell>
            <Table.HeadCell>DeadLine</Table.HeadCell>
            <Table.HeadCell>Created By</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
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
                  <Table.Row
                    className="group bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={index}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium cursor-pointer text-cyan-600 hover:underline dark:text-cyan-500">
                      <Link href={`projects/${project.projectdata.id}`}>
                        {project.projectdata.title}
                      </Link>
                    </Table.Cell>

                    <Table.Cell>{project.projectdata.date}</Table.Cell>
                    <Table.Cell>
                      {
                        <div className="flex gap-2 items-center">
                          <Image
                            src={
                              userData.find(
                                (user) =>
                                  user.email === project.projectdata.createdBy
                              )?.image || "/assets/default-profile.svg"
                            }
                            alt="Profile"
                            width={24}
                            height={24}
                            className="h-6 w-6 rounded-full"
                          />
                          <span>
                            {
                              userData.find(
                                (user) =>
                                  user.email === project.projectdata.createdBy
                              )?.name
                            }
                          </span>
                        </div>
                      }
                    </Table.Cell>
                    <Table.Cell>
                      {project.projectdata.createdBy == email && (
                        <>
                          <button
                            className="w-fit p-1 rounded-md text-red-700 hover:bg-gray-100 cursor-pointer opacity-0 group-hover:opacity-100"
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
                    </Table.Cell>
                  </Table.Row>
                ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default ProjectTable;
