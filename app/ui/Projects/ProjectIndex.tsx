"use client";
import React, { useEffect, useState } from "react";
import { EmailObj, ProjectData, ProjectPageProps } from "@/definition";
import ProjectCard from "@/app/ui/Projects/ProjectCard";
import { getAllProjectsData } from "@/app/lib/actions";
import ProjectModal from "@/app/ui/Projects/ProjectModal";
import { useDispatch } from "react-redux";
import { setProject } from "@/app/redux/projectSlice";
import { useRouter } from "next/navigation";
import { MdOutlineArrowRight } from "react-icons/md";
import Link from "next/link";

const ProjectIndex: React.FC<ProjectPageProps> = ({ email }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [viewAllBtn, setViewAllBtn] = useState<boolean>(false);

  useEffect(() => {
    const getData = getAllProjectsData(setProjects, email);
    return () => getData;
  }, []);

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
  }, [projects]);

  const handleClick = async (project: ProjectData) => {
    await dispatch(setProject(project));
    router.push(`/projects/${project.id}`);
  };

  return (
    <>
      {viewAllBtn && (
        <div className="flex w-full justify-end pr-2 pt-2">
          <Link href="/all-projects" className="flex items-center hover:underline">
            <span className="text-sm">view all</span>
            <MdOutlineArrowRight size={20}/>
          </Link>
        </div>
      )}
      <div className="p-4 flex gap-8 overflow-hidden">
        <ProjectModal email={email} />

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
