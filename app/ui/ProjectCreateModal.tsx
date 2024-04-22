"use client";
import { emailValidation, generateId } from "@/app/lib/utils";
import { addProject } from "@/app/redux/projectSlice";
import { setTasktoFirebase } from "@/app/redux/taskSlice";
import { EmailObj, ProjectData, ProjectCreateModalProps } from "@/definition";
import { Button, Modal, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { PiWarningDiamondFill } from "react-icons/pi";
import { useDispatch } from "react-redux";

const ProjectCreateModal: React.FC<ProjectCreateModalProps> = ({
  email,
  setOpenModal,
  openModal,
}) => {
  const [disableBtn, setDisableBtn] = useState(false);
  const projectRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const emailsRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const CreateProject = async () => {
    if (
      projectRef.current?.value === "" ||
      descriptionRef.current?.value === "" ||
      dateRef.current?.value === "" ||
      emailsRef.current?.value === ""
    ) {
      setError("Please fill all fields");
      setDisableBtn(false);
      return;
    }
    setDisableBtn(true);
    const emailInput = emailsRef.current;
    const emailList: EmailObj[] =
      emailInput?.value
        .split(",")
        .map((email) => ({ email: email.trim(), approval: false })) || [];

    let isValid = false;
    let filteredEmailList: EmailObj[] = [];
    if (emailList?.length > 0) {
      filteredEmailList = emailList.filter(
        (emailObj) => emailObj.email !== email
      );

      if (filteredEmailList.length > 0) {
        filteredEmailList?.forEach((emailObj) => {
          isValid = emailValidation(emailObj.email);

          if (!isValid) {
            setError("Invalid email address");
            setDisableBtn(false);
            return;
          }
        });
      } else {
        setError("Add other Team members");
        setDisableBtn(false);
        return;
      }
    }

    if (isValid) {
      const project: ProjectData = {
        id: generateId(),
        title: projectRef.current?.value || "",
        description: descriptionRef.current?.value || "",
        date: dateRef.current?.value
          ? new Date(dateRef.current.value).toLocaleDateString()
          : new Date().toLocaleDateString(),
        createdBy: email,
        team: filteredEmailList,
      };
      await dispatch(addProject(project));
      await dispatch(setTasktoFirebase(project.id));
      router.push(`/projects/${project.id}`);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setError(null);
    setDisableBtn(false);
    if (projectRef.current) projectRef.current.value = "";
  };

  const handleKeyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      CreateProject();
    }
  };

  return (
    <Modal
      dismissible
      initialFocus={projectRef}
      show={openModal}
      onClose={closeModal}
      size={"xl"}
      onKeyDown={handleKeyDownEvent}
    >
      <Modal.Header>Create Project</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="relative pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
              Required fields are marked with an asterisk{" "}
            </span>
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

          <div className="flex flex-col gap-2">
            <label className="relative w-fit pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
              Add Team
            </label>
            <input
              ref={emailsRef}
              type="email"
              className="rounded-sm border-2 border-blue-400 appearance-none"
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
            disabled={disableBtn}
          >
            {disableBtn ? <Spinner /> : "Create"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectCreateModal;
