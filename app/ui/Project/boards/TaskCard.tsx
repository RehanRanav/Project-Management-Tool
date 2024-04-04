import { TaskObject } from "@/definition";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

const TaskCard: React.FC<TaskObject> = ({ task, issueType, id }) => {
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
      type: 'TaskCard',
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
      className="w-full bg-white flex flex-col p-2 shadow-lg rounded-sm"
    >
      <div>{task}</div>
    </div>
  );
};

export default TaskCard;
