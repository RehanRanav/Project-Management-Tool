"use client";
import { Button, CustomFlowbiteTheme, Dropdown, Modal } from "flowbite-react";
import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

const TaskModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const customTheme: CustomFlowbiteTheme["dropdown"] = {
    floating:{
        base: ""
    }
  };
  return (
    <div>
      <Button
        color="blue"
        size="xs"
        onClick={() => setOpenModal(true)}
        className="rounded-sm"
      >
        Create
      </Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create issue</Modal.Header>
        <Modal.Body>
          <div className="flex items-center justify-between">
            <span className="relative pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
              Required fields are marked with an asterisk{" "}
            </span>
            <div className="flex items-center gap-2">
              <span className="p-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-sm">
                Import issues
              </span>
              <HiDotsHorizontal size={30} className="p-1 cursor-pointer hover:bg-gray-200 rounded-sm"/>
            </div>
          </div>
          <div>
            <label className="relative pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">Project</label>
            <div className="lg:w-1/2">
               <select className="w-full cursor-pointer border-2 border-gray-100 rounded">
                <option className="">Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
               </select>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TaskModal;
