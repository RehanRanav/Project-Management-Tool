"use client";
import React, { useEffect, useState } from "react";
import { EmailObj, ProjectData, ProjectPageProps } from "@/definition";
import ProjectCard from "@/app/ui/Projects/ProjectCard";
import { getAllProjectsData } from "@/app/lib/actions";
import ProjectModal from "@/app/ui/Projects/ProjectModal";
import { useDispatch } from "react-redux";
import { setProject } from "@/app/redux/projectSlice";
import { useRouter } from "next/navigation";

const ProjectIndex: React.FC<ProjectPageProps> = ({ email }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getData = getAllProjectsData(setProjects, email);
    return () => getData;
  }, []);

  const handleClick = async (project: ProjectData) => {
    await dispatch(setProject(project));
    router.push(`/projects/${project.id}`);
  };

  return (
    <div className="flex flex-wrap gap-8 p-4">
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
  );
};

export default ProjectIndex;
