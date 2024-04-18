"use client";
import {
  deleteProjectFromFirbase,
  getAllProjectsData,
  getUserData,
} from "@/app/lib/actions";
import { EmailObj, ProjectPageProps, UserData } from "@/definition";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const ProjectTable: React.FC<ProjectPageProps> = ({ email }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [userData, setUserData] = useState<UserData[] | []>([]);

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
  }, [projects]);

  const deleteProject = async (id: string) => {
    const res = await deleteProjectFromFirbase(id);
  };

  return (
    <div className="p-2">
      <div className="grid grid-cols-4 p-2 border-b bg-gray-100">
        <div>Project Name</div>
        <div>DeadLine</div>
        <div>Created By</div>
      </div>
      {projects.length > 0 &&
        projects
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
              className="grid grid-cols-4 p-2 hover:bg-gray-50 cursor-pointer"
              key={index}
            >
              <Link
                href={`projects/${project.projectdata.id}`}
                className="text-blue-700 hover:underline-offset-4 hover:underline"
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
                      className="h-7 w-7 rounded-md"
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
                  <button
                    className="w-fit p-1 rounded-md hover:bg-gray-100 hover:text-blue-700"
                    onClick={() =>
                      deleteProject(project.projectdata.id as string)
                    }
                  >
                    <MdDelete size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
    </div>
  );
};

export default ProjectTable;
