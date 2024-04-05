"use client";
import React, { useEffect, useState } from "react";
import { ProjectIndexProps } from "@/definition";
import ProjectCard from "@/app/ui/Projects/ProjectCard";
import { getAllProjectsData } from "@/app/lib/actions";

const ProjectIndex: React.FC<ProjectIndexProps> = ({ email }) => {
  const [projects, setProjects] = useState<any[]>([]);
  
  useEffect(() => {
    const getData = getAllProjectsData(setProjects, email);
    return () => getData;
  }, []);

  return (
    <div className="flex flex-wrap gap-8 p-4">
      {projects.length > 0 &&
        projects.map((project, index) => (
          <ProjectCard project={project.projectdata} key={index} />
        ))}
    </div>
  );
};

export default ProjectIndex;
