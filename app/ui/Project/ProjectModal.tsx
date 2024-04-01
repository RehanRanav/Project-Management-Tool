"use client";
import { generateRandomNumber } from "@/app/lib/utils";
import { addProject, selectProject } from "@/app/redux/projectSlice";
import { useAppSelector } from "@/app/redux/store";
import { ProjectData, ProjectModalProps } from "@/definition";
import { Button, Card, Modal } from "flowbite-react";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal, HiPlus } from "react-icons/hi";
import { PiWarningDiamondFill } from "react-icons/pi";
import { useDispatch } from "react-redux";

const ProjectModal: React.FC<ProjectModalProps> = ({ email }) => {
  const [openModal, setOpenModal] = useState(false);
  const projectRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const Project = useAppSelector(selectProject);

  useEffect(() => {
    if (
      Project.title &&
      Project.id &&
      Project.description &&
      Project.createdBy &&
      Project.date
    ) {
      redirect("/project/boards");
    }
  }, [Project]);

  const CreateProject = async () => {
    if (
      projectRef.current?.value === "" ||
      descriptionRef.current?.value === "" ||
      dateRef.current?.value === ""
    ) {
      setError("Please fill all fields");
    } else {
      const project: ProjectData = {
        id: generateRandomNumber(),
        title: projectRef.current?.value || "",
        description: descriptionRef.current?.value || "",
        date: dateRef.current?.value
          ? new Date(dateRef.current.value).toLocaleDateString()
          : new Date().toLocaleDateString(),
        createdBy: email,
      };
      await dispatch(addProject(project));
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setError(null);
    if (projectRef.current) projectRef.current.value = "";
  };

  return (
    <div className="cursor-pointer hover:opacity-80">
      <Card className="w-fit bg-gray-200" onClick={() => setOpenModal(true)}>
        <HiPlus size={50} className="text-gray-400" />
      </Card>
      <Modal
        dismissible
        initialFocus={projectRef}
        show={openModal}
        onClose={closeModal}
      >
        <Modal.Header>Create Project</Modal.Header>
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
            {error ? (
              <div className="flex items-center gap-2 text-red-600 text-xs">
                <PiWarningDiamondFill />
                <span>{error}</span>
              </div>
            ) : null}
            <div className="flex flex-col gap-2">
              <label className="relative w-fit pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
                Project Name
              </label>
              <input
                type="text"
                required
                ref={projectRef}
                className="rounded-sm border-2 border-blue-400 appearance-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="relative w-fit pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
                Project Description
              </label>
              <textarea
                ref={descriptionRef}
                className="rounded-sm border-2 border-blue-400 appearance-none"
              ></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label className="relative w-fit pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
                Deadline
              </label>
              <input
                ref={dateRef}
                type="date"
                required
                className="rounded-sm border-2 border-blue-400 w-fit"
              />
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
              onClick={CreateProject}
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

export default ProjectModal;
