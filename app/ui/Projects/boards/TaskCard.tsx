import { TaskObject } from "@/definition";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Tooltip } from "flowbite-react";
import React from "react";

const TaskCard: React.FC<TaskObject> = ({ task, issueType, id, assignTo }) => {
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

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className="p-4 shadow-sm shadow-gray-300 bg-white hover:shadow-md hover:bg-gray-50 rounded-sm flex flex-col gap-3 cursor-pointer w-full"
    >
      <div className="text-sm font-medium">{task}</div>
      <div className="flex justify-between">
        <span>{}</span>
        <Tooltip
          content={`Assign To: ${assignTo.name}`}
          placement="left"
          className="text-[10px]"
        >
          <img
            src={assignTo.image}
            alt="Profile"
            className="h-6 w-6 rounded-md"
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default TaskCard;
