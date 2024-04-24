"use client";
import React, { useEffect, useState } from "react";
import {
  getAllProjectsData,
  removeFromTeam,
  updateProjectApproval,
} from "@/app/lib/actions";
import { EmailObj, ProjectData, ProjectPageProps } from "@/definition";
import ProjectCard from "@/app/ui/Projects/ProjectCard";
import ProjectInviteModal from "@/app/ui/Projects/ProjectInviteModal";

const RequestedProject: React.FC<ProjectPageProps> = ({ email }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [filteredRequestedProjects, setFilterdRequestedProjects] = useState<
    any[]
  >([]);
  const [projectCardData, setProjectCardData] = useState<ProjectData | null>(
    null
  );

  useEffect(() => {
    const getData = getAllProjectsData(setProjects, email);
    return () => getData;
  }, [email]);

  useEffect(() => {
    const temp = projects.filter((project) =>
      project.projectdata.team.some(
        (member: EmailObj) =>
          member.email === email && member.approval === false
      )
    );
    setFilterdRequestedProjects(temp);
  }, [projects, email]);

  const OpenInviteModal = (projectData: any) => {
    setOpenModal(true);
    console.log(projects);

    setProjectCardData(projectData);
  };

  return filteredRequestedProjects.length > 0 ? (
    <div className="mt-4">
      <div className="text-lg font-semibold border-b m-4">
        Requested Projects
      </div>

      <div className="p-4 flex flex-wrap gap-4 overflow-x-hidden justify-center md:justify-normal">
        {projects.length > 0 &&
          filteredRequestedProjects.map((project, index) => (
            <React.Fragment key={index}>
              <div
                className="w-fit hover:opacity-50"
                onClick={() => OpenInviteModal(project.projectdata)}
              >
                <ProjectCard project={project.projectdata} email={email} />
              </div>
            </React.Fragment>
          ))}
      </div>
      <ProjectInviteModal
        email={email}
        projectData={projectCardData}
        setOpenModal={setOpenModal}
        openModal={openModal}
      />
    </div>
  ) : (
    <></>
  );
};

export default RequestedProject;
