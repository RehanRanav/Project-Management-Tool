import React, { ReactNode, useEffect, useState } from "react";
import { TaskObject } from "@/definition";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskModal from "@/app/ui/Projects/boards/TaskModal";
import { CustomFlowbiteTheme, Tooltip } from "flowbite-react";
import { RiTaskFill, RiBookmarkFill } from "react-icons/ri";
import { PiDiceOneFill } from "react-icons/pi";
import { HiBolt } from "react-icons/hi2";
import { GrDrag } from "react-icons/gr";

const customeTheme: CustomFlowbiteTheme["tooltip"] = {
  base: "absolute z-10 inline-block rounded-sm px-2 py-1 text-xs font-medium shadow-sm",
};
const TaskCard: React.FC<TaskObject> = ({
  task,
  issueType,
  id,
  assignTo,
  initialStatus,
  ticketNo,
}) => {
  const [issueTypeicon, setIssueTypeIcon] = useState<ReactNode | undefined>();
  const [openModal, setOpenModal] = useState(false);

  const { attributes, setNodeRef, listeners, transform, transition } =
    useSortable({
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
        ref={setNodeRef}
        style={{
          transition,
          transform: CSS.Translate.toString(transform),
        }}
        className="py-2 pr-2 pl-1.5 shadow-sm shadow-gray-300 bg-white hover:shadow-md hover:bg-gray-50 rounded-sm cursor-pointer h-full w-full flex gap-2 items-center"
        onClick={() => setOpenModal(true)}
      >
        <div {...listeners} className="cursor-grabbing ">
          <GrDrag size={16} color="gray"/>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="text-sm font-medium">{task}</div>
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-1">
              <Tooltip
                theme={customeTheme}
                content={issueType}
                placement="bottom"
                className="text-[8px]"
                arrow={false}
              >
                <span>{issueTypeicon}</span>
              </Tooltip>
              <span className="text-xs font-medium">{`T-${ticketNo}`}</span>
            </div>
            <Tooltip
              theme={customeTheme}
              content={`Assign To: ${assignTo.name}`}
              placement="left"
              className="text-[10px]"
            >
              <img
                src={assignTo.image}
                alt="Profile"
                className="h-6 w-6 rounded-full"
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <TaskModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        mode="TaskUpdateMode"
        cardData={{ task, issueType, id, assignTo, initialStatus, ticketNo }}
      />
    </>
  );
};

export default TaskCard;
