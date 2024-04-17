import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import React from "react";
import TaskCard from "@/app/ui/Projects/boards/TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { Tasklist } from "@/definition";

const TaskColumn: React.FC<Tasklist> = ({ title, id, cards }) => {
  const { setNodeRef} = useDroppable({id: id});

  return (
    <SortableContext items={cards} id={String(id)} strategy={rectSortingStrategy}>
      <div className="h-screen bg-gray-100 w-full" ref={setNodeRef}>
        <div className="w-full text-center text-gray-500">{title}</div>
        <div className="p-2 flex flex-col gap-3">
          {cards &&
            cards.map(
              (card) =>
                  <TaskCard
                    key={card.id}
                    id={card.id}
                    task={card.task}
                    issueType={card.issueType}
                    assignTo={card.assignTo}
                    initialStatus = {card.initialStatus}
                    ticketNo={card.ticketNo}
                  />
            )}
        </div>
      </div>
    </SortableContext>
  );
};

export default TaskColumn;
