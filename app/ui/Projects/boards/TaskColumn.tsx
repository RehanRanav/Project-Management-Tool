import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import React, { Suspense, useEffect, useState } from "react";
import TaskCard from "@/app/ui/Projects/boards/TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { TaskObject, Tasklist } from "@/definition";
import { useAppSelector } from "@/app/redux/store";
import { selectSearchInput } from "@/app/redux/searchSlice";
import { TaskColumnSkeleton } from "@/app/ui/skeleton";

const TaskColumn: React.FC<Tasklist> = ({ title, id, cards }) => {
  const { setNodeRef } = useDroppable({ id: id });
  const searchValue = useAppSelector(selectSearchInput);
  const [filteredTasks, setFilteredTasks] = useState<TaskObject[]>(cards);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (title) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [cards, title]);

  useEffect(() => {
    if (searchValue !== "") {
      const temp: TaskObject[] = [];

      cards.forEach((card) => {
        if (
          card.task.toLowerCase().includes(searchValue) ||
          card.ticketNo.toString().includes(searchValue)
        ) {
          temp.push(card);
        }
      });
      setFilteredTasks(temp);
    } else {
      setFilteredTasks(cards);
    }
  }, [searchValue, cards]);

  return (
    <SortableContext
      items={cards}
      id={String(id)}
      strategy={rectSortingStrategy}
    >
      {isLoading ? (
        <TaskColumnSkeleton />
      ) : (
        <div className="bg-gray-200 w-full" ref={setNodeRef}>
          <div className="w-full text-center text-gray-500 p-2 sticky top-0 bg-gray-100 z-10">
            {title}
          </div>
          <div className="p-2 flex flex-col gap-1.5">
            {cards &&
              filteredTasks.map((card) => (
                <TaskCard
                  key={card.id}
                  id={card.id}
                  task={card.task}
                  issueType={card.issueType}
                  assignTo={card.assignTo}
                  initialStatus={card.initialStatus}
                  ticketNo={card.ticketNo}
                  columnId={id as string}
                />
              ))}
          </div>
        </div>
      )}
    </SortableContext>
  );
};

export default TaskColumn;
