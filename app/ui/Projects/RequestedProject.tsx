"use client";
import React, { useEffect, useState } from "react";
import {
  getAllProjectsData,
  removeFromTeam,
  updateProjectApproval,
} from "@/app/lib/actions";
import { EmailObj, ProjectPageProps } from "@/definition";
import ProjectCard from "@/app/ui/Projects/ProjectCard";
import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/navigation";

const RequestedProject: React.FC<ProjectPageProps> = ({ email }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getData = getAllProjectsData(setProjects, email);
    return () => getData;
  }, []);

  const handleAcceptInvite = async (id: string) => {
    
    const res = await updateProjectApproval(id, email);
    if (res) {
      router.push(`/projects/${id}`);
    }
  };
  
  const handleCancelInvite = async (id: string) => {
    const res = await removeFromTeam(id, email);
    console.log(res);
  };

  return (
    <div className="mt-4 ">
      <div className="text-lg font-semibold border-b m-4">
        Requested Projects
      </div>

      <div className="flex flex-wrap gap-8 p-4">
        {projects.length > 0 &&
          projects
            .filter((project) =>
              project.projectdata.team.some(
                (member: EmailObj) =>
                  member.email === email && member.approval === false
              )
            )
            .map((project, index) => (
              <React.Fragment key={index}>
                <div
                  className="w-fit hover:opacity-50"
                  onClick={() => setOpenModal(true)}
                >
                  <ProjectCard project={project.projectdata} email={email} />
                </div>
                <Modal
                  show={openModal}
                  size="xl"
                  onClose={() => setOpenModal(false)}
                  dismissible
                  popup
                >
                  <Modal.Header />
                  <Modal.Body>
                    <div className="text-center">
                      {" "}
                      <h3 className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
                        <b> {project.projectdata.createdBy} </b> has invited you
                        to get started on the <b>{project.projectdata.title}</b>{" "}
                        Project. Once you accept, you’ll be able to access it.
                      </h3>
                      <div className="flex justify-center gap-4 z-10">
                        <Button
                          color="blue"
                          onClick={() =>handleAcceptInvite(project.projectdata.id)}
                        >
                          {"Accept Invitation"}
                        </Button>
                        <Button
                          color="gray"
                          onClick={() =>
                            handleCancelInvite(project.projectdata.id)
                          }
                        >
                          No, cancel
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </React.Fragment>
            ))}
      </div>
    </div>
  );
};

export default RequestedProject;
