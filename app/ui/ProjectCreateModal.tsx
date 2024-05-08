"use client";
import {
  dateValidation,
  emailValidation,
  generateId,
  tomorrow,
} from "@/app/lib/utils";
// import { setTasktoFirebase } from "@/app/redux/taskSlice";
import { EmailObj, ProjectData, ProjectCreateModalProps } from "@/definition";
import { Button, Modal, Spinner } from "flowbite-react";
import { FC, useRef, useState, KeyboardEvent } from "react";
import { PiWarningDiamondFill } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { searchForProjectName } from "@/app/lib/actions";
import { addProject } from "../redux/projectSlice";
import { AppDispatch } from "../redux/store";
import { setTasktoFirebase } from "../redux/taskSlice";
import { useRouter } from "next/navigation";

const ProjectCreateModal: FC<ProjectCreateModalProps> = ({
  email,
  setOpenModal,
  openModal,
}) => {
  const [disableBtn, setDisableBtn] = useState(false);
  const projectRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const emailsRef = useRef<HTMLInputElement | null>(null);
  const createProjectBtnRef = useRef<HTMLButtonElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const CreateProject = async () => {
    if (
      projectRef.current?.value.trim() === "" ||
      descriptionRef.current?.value.trim() === "" ||
      dateRef.current?.value.trim() === "" ||
      emailsRef.current?.value.trim() === ""
    ) {
      if (projectRef.current?.value.trim() === "") {
        setFieldError("projectNameError");
        setError("Please fill Project Name fields");
      } else if (descriptionRef.current?.value.trim() === "") {
        setFieldError("projectDescriptionError");
        setError("Please fill Project Description fields");
      } else if (dateRef.current?.value === "") {
        setFieldError("projectDateError");
        setError("Please fill Project Deadline fields");
      } else if (emailsRef.current?.value.trim() === "") {
        setFieldError("projectEmailsError");
        setError("Please fill Project Email fields");
      }
      setDisableBtn(false);
      return;
    }
    if (dateRef.current?.value) {
      const res = dateValidation(dateRef.current?.value);
      if (!res) {
        setFieldError("projectDateError");
        setError("Please fill Valid Project Deadline");
        return;
      }
    }
    if (projectRef.current?.value.trim()) {
      const res = await searchForProjectName(projectRef.current.value, email);
      if (res) {
        setFieldError("projectNameError");
        setError("Project Name already exists");
        return;
      }
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
            setFieldError("projectEmailsError");
            setError("Invalid email address");
            setDisableBtn(false);
            return;
          }
        });
      } else {
        setFieldError("projectEmailsError");
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
      dispatch(addProject(project));
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

  const handleKeyDownEvent = (event: KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (event.key === "Enter" && !disableBtn) {
      createProjectBtnRef.current?.click();
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
              className={`rounded-sm border-2 outline-none appearance-none ${
                fieldError === `projectNameError`
                  ? "border-red-400"
                  : "border-blue-400"
              }`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="relative w-fit pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
              Project Description
            </label>
            <textarea
              ref={descriptionRef}
              className={`rounded-sm border-2 outline-none appearance-none ${
                fieldError === `projectDescriptionError`
                  ? "border-red-400"
                  : "border-blue-400"
              }`}
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
              className={`rounded-sm border-2 outline-none w-fit ${
                fieldError === `projectDateError`
                  ? "border-red-400"
                  : "border-blue-400"
              }`}
              min={tomorrow.toISOString().split("T")[0]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="relative w-fit pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
              Add Team
            </label>
            <span className="w-fit pr-4 text-[10px] text-gray-600">
              <b>Note: </b>
              {" (Please separate multiple email addresses with commas (,))"}
            </span>
            <input
              ref={emailsRef}
              type="email"
              className={`rounded-sm border-2 outline-none appearance-none ${
                fieldError === `projectEmailsError`
                  ? "border-red-400"
                  : "border-blue-400"
              }`}
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
            ref={createProjectBtnRef}
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
