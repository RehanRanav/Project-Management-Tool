"use client";
import React, { useEffect, useState } from "react";
import { EmailObj, ProjectData, ProjectPageProps } from "@/definition";
import ProjectCard from "@/app/ui/Projects/ProjectCard";
import { getAllProjectsData } from "@/app/lib/actions";
import ProjectCreateModal from "@/app/ui/ProjectCreateModal";
import { useDispatch } from "react-redux";
import { setProject } from "@/app/redux/projectSlice";
import { useRouter } from "next/navigation";
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";

const ProjectIndex: React.FC<ProjectPageProps> = ({ email }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [viewAllBtn, setViewAllBtn] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getData = getAllProjectsData(setProjects, email);
    return () => getData;
  }, [email]);

  useEffect(() => {
    const tempProject = projects.filter(
      (project) =>
        project.projectdata.createdBy === email ||
        project.projectdata.team.some(
          (member: EmailObj) =>
            member.email === email && member.approval === true
        )
    );
    if (tempProject.length > 1) {
      setViewAllBtn(true);
    } else {
      setViewAllBtn(false);
    }
  }, [projects, email]);

  const handleClick = async (project: ProjectData) => {
    await dispatch(setProject(project));
    router.push(`/projects/${project.id}`);
  };

  return (
    <>
      {viewAllBtn && (
        <div className="flex w-full justify-end pr-2 pt-2">
          <Link
            href="/all-projects"
            className="flex items-center gap-1 text-blue-700 text-sm hover:underline"
          >
            <span className="text-sm">View all</span>
            <IoArrowForward size={16} />
          </Link>
        </div>
      )}
      <div className="p-4 flex flex-wrap gap-4 overflow-x-hidden justify-center md:justify-normal">
        <div className="p-4 border-2 border-dashed shadow-sm shadow-gray-300 bg-white hover:shadow-md hover:opacity-80 rounded-sm flex flex-col gap-3 cursor-pointer w-52 h-40 max-w-52 max-h-48">
          <button
            className="h-full w-full flex justify-center items-center"
            onClick={() => setOpenModal(true)}
          >
            <HiPlus size={100} className="text-gray-300" />
          </button>
        </div>
        <ProjectCreateModal
          email={email}
          setOpenModal={setOpenModal}
          openModal={openModal}
        />

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
            .slice(0, 4)
            .map((project, index) => (
              <ProjectCard
                project={project.projectdata}
                email={email}
                key={index}
                ClickFunction={() => handleClick(project.projectdata)}
              />
            ))}
      </div>
    </>
  );
};

export default ProjectIndex;
