"use client";
import { Button, Modal } from "flowbite-react";
import React, { useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiTaskFill, RiBookmarkFill } from "react-icons/ri";
import { PiDiceOneFill, PiWarningDiamondFill } from "react-icons/pi";
import { HiBolt } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { addTask } from "@/app/redux/taskSlice";
import { TaskObject } from "@/definition";
import { generateRandomNumber } from "@/app/lib/utils";

const TaskModal = () => {
  const issueTypes = [
    { icon: RiTaskFill, color: `text-sky-400`, content: `Task` },
    { icon: RiBookmarkFill, color: `text-green-400`, content: `Story` },
    { icon: PiDiceOneFill, color: `text-red-400`, content: `Bug` },
    { icon: HiBolt, color: `text-violet-400`, content: `Epic` },
  ];
  const [openModal, setOpenModal] = useState(false);
  const [issueType, setIssueType] = useState(issueTypes[0]);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const issueTypeRef = useRef<HTMLDivElement | null>(null);
  const summaryRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const toggleIssueType = () => {
    const element = issueTypeRef.current;
    if (element) {
      if (element.style.display === "none") {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
  };

  const CreateTask = () => {
    if (summaryRef.current) {
      let summary = summaryRef.current.value;
      summary = summary.trim();
      if (summary.length > 0) {
        const task: TaskObject = {
          id: generateRandomNumber(),
          task: summaryRef.current?.value || "",
          issueType: issueType.content,
          initialStatus: "todo",
        };
        dispatch(addTask(task));
        closeModal();
      } else {
        setSummaryError("Summary is required");
      }
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setIssueType(issueTypes[0]);
    setSummaryError(null);
    if (summaryRef.current) summaryRef.current.value = "";
  };

  return (
    <div>
      <Button
        color="blue"
        size="sm"
        onClick={() => setOpenModal(true)}
        className="rounded-sm"
      >
        Create
      </Button>
      <Modal
        dismissible
        show={openModal}
        onClose={closeModal}
        initialFocus={summaryRef}
      >
        <Modal.Header>Create issue</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="relative pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
                Required fields are marked with an asterisk{" "}
              </span>
              <div className="flex items-center">
                <HiDotsHorizontal
                  size={30}
                  className="p-1 cursor-pointer hover:bg-gray-200 rounded-sm"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="relative w-fit pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
                Issue type
              </label>
              <div
                className="lg:w-1/2 group cursor-pointer relative"
                onClick={toggleIssueType}
              >
                <div className="border-2 border-gray-100 ">
                  {
                    <div className="p-2 flex gap-2 items-center">
                      <issueType.icon className={issueType.color} />
                      <span>{issueType.content}</span>
                    </div>
                  }
                </div>
                <div
                  className="bg-white border shadow-md rounded absolute left-0 right-0 z-10"
                  style={{ display: "none" }}
                  ref={issueTypeRef}
                >
                  {issueTypes.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setIssueType(item)}
                      className="p-2 flex gap-2 items-center hover:bg-blue-600 hover:text-white"
                    >
                      <item.icon size={16} className={item.color} />
                      <span>{item.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="relative w-fit pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
                Summary
              </label>
              <input
                type="text"
                required
                ref={summaryRef}
                className="rounded-sm border-2 border-blue-400 appearance-none"
              />
              {summaryError ? (
                <div className="flex items-center gap-2 text-red-600 text-xs">
                  <PiWarningDiamondFill />
                  <span>{summaryError}</span>
                </div>
              ) : null}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="w-full flex gap-4 justify-end">
            <button
              className="bg-transparent hover:underline border-none"
              onClick={closeModal}
            >
              Cancel
            </button>
            <Button
              color="blue"
              size="sm"
              onClick={CreateTask}
              className="rounded-sm"
            >
              Create
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskModal;
