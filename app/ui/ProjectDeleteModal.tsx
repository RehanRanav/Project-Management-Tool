"use client";
import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { deleteProjectFromFirbase } from "@/app/lib/actions";
import { ProjectDeleteModalProps } from "@/definition";

const ProjectDeleteModal: React.FC<ProjectDeleteModalProps> = ({
  projectData,
  setOpenModal,
  openModal,
}) => {
  const deleteProject = async (id: string) => {
    const res = await deleteProjectFromFirbase(id);
    if (res) {
      setOpenModal(false);
    }
  };

  const stopPropagationOnModal = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };
  return (
    <Modal
      show={openModal}
      size="md"
      onClose={() => setOpenModal(false)}
      popup
      onClick={stopPropagationOnModal}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this {projectData?.title} Project
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={() => deleteProject(projectData?.id as string)}
              size={"sm"}
            >
              {"Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)} size={"sm"}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProjectDeleteModal;
