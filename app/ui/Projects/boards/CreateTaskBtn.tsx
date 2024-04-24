"use client";
import React, { useState } from "react";
import TaskModal from "@/app/ui/Projects/boards/TaskModal";
import { Button } from "flowbite-react";

const CreateTaskBtn = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        color="blue"
        size="sm"
        onClick={() => setOpenModal(true)}
        className="rounded-sm"
      >
        Create Task
      </Button>
      <TaskModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        mode="TaskCreateMode"
      />
    </>
  );
};

export default CreateTaskBtn;
