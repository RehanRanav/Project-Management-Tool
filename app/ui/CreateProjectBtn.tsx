"use client";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import { HiPlus } from "react-icons/hi2";
import ProjectCreateModal from "@/app/ui/ProjectCreateModal";
import { ProjectPageProps } from "@/definition";

const CreateProjectBtn: React.FC<ProjectPageProps> = ({ email }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex w-full justify-end font-medium">
      <Button
        color="blue"
        size="sm"
        onClick={() => setOpenModal(true)}
        className="rounded-sm"
      >
        <HiPlus size={24} className="text-gray-300" />
        <span className="md:block hidden">Create Project</span>
      </Button>
      <ProjectCreateModal
        email={email}
        setOpenModal={setOpenModal}
        openModal={openModal}
      />
    </div>
  );
};

export default CreateProjectBtn;
