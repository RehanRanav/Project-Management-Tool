"use client";
import { Button, CustomFlowbiteTheme, Dropdown, Modal } from "flowbite-react";
import React, { FC, useEffect, useRef, useState } from "react";
import { RiTaskFill, RiBookmarkFill } from "react-icons/ri";
import { PiDiceOneFill, PiWarningDiamondFill } from "react-icons/pi";
import { HiBolt } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { addTask } from "@/app/redux/taskSlice";
import { TaskModalProps, TaskObject, UserData } from "@/definition";
import { generateRandomNumber } from "@/app/lib/utils";
import { getProjectData, updateTaskCard } from "@/app/lib/actions";
import { useParams } from "next/navigation";

const customeTheme: CustomFlowbiteTheme["dropdown"] = {
  inlineWrapper:
    "flex items-center w-1/2 justify-between border-2 border-gray-100 p-2",
  floating: {
    item: {
      base: "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700",
    },
  },
};

const TaskModal: FC<TaskModalProps> = ({
  openModal,
  setOpenModal,
  mode,
  cardData,
}) => {
  const issueTypes = [
    { icon: RiTaskFill, color: `text-sky-400`, content: `Task` },
    { icon: RiBookmarkFill, color: `text-green-400`, content: `Story` },
    { icon: PiDiceOneFill, color: `text-red-400`, content: `Bug` },
    { icon: HiBolt, color: `text-violet-400`, content: `Epic` },
  ];
  const [issueType, setIssueType] = useState(issueTypes[0]);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [summaryValue, setSummaryvalue] = useState("");
  const [assigneeArr, setAssigneeArr] = useState<UserData[]>([]);
  const [assignee, setAssignee] = useState(assigneeArr[0]);
  const summaryRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.id) {
          const res = await getProjectData(params.id as string);

          if (res?.userdata) {
            setAssigneeArr(res.userdata);
          }
        }
      } catch (error) {
        console.error("Error fetching User data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (mode === "TaskCreateMode") {
      setSummaryvalue("");
      setAssignee(assigneeArr[0]);
    } else {
      if (cardData?.assignTo) {
        setAssignee(cardData?.assignTo);
      }
      if (cardData?.issueType) {
        const issueTypeTemp = issueTypes.find(
          (item) => item.content === cardData.issueType
        );
        if (issueTypeTemp) setIssueType(issueTypeTemp);
      }
      if (cardData?.task) {
        setSummaryvalue(cardData.task);
      }
    }
  }, [assigneeArr, cardData, mode]);

  const CreateTask = () => {
    if (issueType.content && assignee && assignee.email) {
      const summary = summaryValue.trim();
      if (summary !== "") {
        const task: TaskObject = {
          id: generateRandomNumber(),
          task: summary || "",
          issueType: issueType.content,
          initialStatus: "todo",
          assignTo: assignee,
        };
        dispatch(addTask(task));
        closeModal();
      } else {
        setSummaryError("Summary is required");
      }
    }
  };

  const EditTask = async () => {
    if (issueType.content && assignee && assignee.email) {
      const summary = summaryValue.trim();
      if (summary !== "" && cardData && cardData.id && cardData.task) {
        const task: TaskObject = {
          id: cardData?.id,
          task: summary,
          issueType: issueType.content,
          initialStatus: cardData?.initialStatus,
          assignTo: assignee,
        };
        const res = await updateTaskCard(task, params.id as string);
        if (res) {
          closeModal();
        }
      } else {
        setSummaryError("Summary is required");
      }
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setIssueType(issueTypes[0]);
    setAssignee(assigneeArr[0]);
    setSummaryError(null);
    setSummaryvalue("");
    if (summaryRef.current) summaryRef.current.value = "";
  };

  return (
    <div>
      <Modal
        dismissible
        show={openModal}
        onClose={closeModal}
        initialFocus={summaryRef}
      >
        <Modal.Header>
          {mode === "TaskCreateMode" ? "Create" : "Update"} issue
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            <span className="relative pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
              Required fields are marked with an asterisk{" "}
            </span>
            <div className="flex flex-col gap-2">
              <label className="relative w-fit pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
                Issue type
              </label>
              <Dropdown
                label={
                  <div className="flex gap-4 items-center">
                    <issueType.icon className={`${issueType.color}`} />
                    <span>{issueType.content}</span>
                  </div>
                }
                className="cursor-pointer"
                inline
                theme={customeTheme}
              >
                {issueTypes.map((item, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => setIssueType(item)}
                    className="p-2 flex gap-1 items-center hover:bg-blue-600 hover:text-white"
                  >
                    <item.icon size={16} className={item.color} />
                    <span>{item.content}</span>
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>

            <div className="flex flex-col gap-2">
              <label className="relative w-fit pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
                Summary
              </label>
              <input
                type="text"
                required
                ref={summaryRef}
                value={summaryValue}
                onChange={(e) => setSummaryvalue(e.target.value)}
                className="rounded-sm border-2 border-blue-400 appearance-none"
              />
              {summaryError ? (
                <div className="flex items-center gap-2 text-red-600 text-xs">
                  <PiWarningDiamondFill />
                  <span>{summaryError}</span>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <label className="relative w-fit pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
                Assignee
              </label>
              <Dropdown
                label={
                  assignee && (
                    <div className="flex gap-4 items-center">
                      <img
                        src={assignee.image}
                        alt="Profile"
                        className="h-7 w-7 rounded-md"
                      />
                      <span>{assignee.name}</span>
                    </div>
                  )
                }
                className=" cursor-pointer"
                inline
                theme={customeTheme}
              >
                {assigneeArr.map((item, index) => (
                  <Dropdown.Item
                    key={index}
                    className="p-2 flex gap-1 items-center hover:bg-blue-600 hover:text-white"
                    onClick={() => setAssignee(item)}
                  >
                    <img
                      src={item.image}
                      alt="Profile"
                      className="h-7 w-7 rounded-md"
                    />
                    <span>{item.name}</span>
                  </Dropdown.Item>
                ))}
              </Dropdown>
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
              onClick={mode == "TaskCreateMode" ? CreateTask : EditTask}
              className="rounded-sm"
            >
              {mode === "TaskCreateMode" ? "Create" : "Update"}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskModal;
