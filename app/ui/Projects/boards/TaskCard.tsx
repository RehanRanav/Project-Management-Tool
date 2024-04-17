import React, { ReactNode, useEffect, useState } from "react";
import { TaskObject } from "@/definition";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskModal from "@/app/ui/Projects/boards/TaskModal";
import { Tooltip } from "flowbite-react";
import { RiTaskFill, RiBookmarkFill } from "react-icons/ri";
import { PiDiceOneFill } from "react-icons/pi";
import { HiBolt } from "react-icons/hi2";

const TaskCard: React.FC<TaskObject> = ({
  task,
  issueType,
  id,
  assignTo,
  initialStatus,
}) => {
  const [issueTypeicon, setIssueTypeIcon] = useState<ReactNode | undefined>();
  const [openModal, setOpenModal] = useState(false);

  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "TaskCard",
    },
  });

  const issueTypes = [
    { icon: <RiTaskFill className="text-sky-400" />, content: `Task` },
    { icon: <RiBookmarkFill className="text-green-400" />, content: `Story` },
    { icon: <PiDiceOneFill className="text-red-400" />, content: `Bug` },
    { icon: <HiBolt className="text-violet-400" />, content: `Epic` },
  ];

  useEffect(() => {
    if (issueType) {
      const selectedIssueType = issueTypes.find(
        (item) => item.content === issueType
      );
      if (selectedIssueType) {
        setIssueTypeIcon(selectedIssueType.icon);
      }
    }
  }, [issueType]);

  return (
    <>
      <div
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        style={{
          transition,
          transform: CSS.Translate.toString(transform),
        }}
        className="px-4 py-2 shadow-sm shadow-gray-300 bg-white hover:shadow-md hover:bg-gray-50 rounded-sm flex flex-col gap-3 cursor-pointer w-full active:cursor-grabbing"
        onClick={() => setOpenModal(true)}
      >
        <div className="text-sm font-medium">{task}</div>
        <div className="flex justify-between items-end">
          <Tooltip
            content={issueType}
            placement="right"
            className="text-[8px]"
            arrow={false}
          >
            <span>{issueTypeicon}</span>
          </Tooltip>
          <Tooltip
            content={`Assign To: ${assignTo.name}`}
            placement="left"
            className="text-[10px]"
          >
            <img
              src={assignTo.image}
              alt="Profile"
              className="h-5 w-5 rounded-sm"
            />
          </Tooltip>
        </div>
      </div>
      <TaskModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        mode="TaskUpdateMode"
        cardData={{ task, issueType, id, assignTo, initialStatus }}
      />
    </>
  );
};

export default TaskCard;
