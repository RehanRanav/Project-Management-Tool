"use client";
import { selectProject } from "@/app/redux/projectSlice";
import { useAppSelector } from "@/app/redux/store";
import { ProjectPageProps } from "@/definition";
import { Dropdown } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import ProjectCreateModal from "@/app/ui/ProjectCreateModal";

const ProjectDropdownBtn: React.FC<ProjectPageProps> = ({ email }) => {
  const project = useAppSelector(selectProject);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="z-20">
      <Dropdown label={<span className="text-sm font-medium">Projects</span>} inline className="w-56">
        <Dropdown.Header>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium">RECENT</span>
            <div className="text-sm font-semibold ">{project.title}</div>
          </div>
        </Dropdown.Header>
        <Dropdown.Item>
          <Link href="/all-projects">View all projects</Link>
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setOpenModal(true)}>
          Create new project
        </Dropdown.Item>
      </Dropdown>
      <ProjectCreateModal
        email={email}
        setOpenModal={setOpenModal}
        openModal={openModal}
      />
    </div>
  );
};

export default ProjectDropdownBtn;
