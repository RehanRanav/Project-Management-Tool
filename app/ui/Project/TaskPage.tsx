"use client";
import { selectTask, setTask } from "@/app/redux/taskSlice";
import { useAppSelector } from "@/app/redux/store";
import React, { useState } from "react";
import TaskCard from "@/app/ui/Project/TaskCard";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useDispatch } from "react-redux";

const TaskPage = () => {
  const tasks = useAppSelector(selectTask);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const dispatch = useDispatch();
  const TaskStatus = [
    { title: "To Do", id: "todo" },
    { title: "In Progress", id: "inprogress" },
    { title: "Review", id: "review" },
    { title: "Done", id: "done" },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskIndex = (id: UniqueIdentifier) => {
    return tasks.findIndex((item) => item.id === id);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  };
  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const activeitemIndex = getTaskIndex(active.id);
      const overitemIndex = getTaskIndex(over.id);
      const updatedTasks = arrayMove(
        tasks,
        activeitemIndex as number,
        overitemIndex as number
      );
      dispatch(setTask(updatedTasks));
    }
  };
  const handleDragEnd = (event: DragEndEvent) => {};

  return (
    <div className="h-full w-full grid grid-cols-4 gap-2 p-1">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        {TaskStatus.map((column) => (
          <SortableContext items={tasks.map((task) => task.id)}>
            <div className="h-screen bg-gray-100 w-full">
              <div className="w-full text-center text-gray-500">
                {column.title}
              </div>
              <div className="p-2 flex flex-col gap-3">
                {tasks &&
                  tasks.map(
                    (task) =>
                      task.status === column.id && (
                        <TaskCard
                          id={task.id}
                          task={task.task}
                          issueType={task.issueType}
                          status={task.status}
                          key={task.id}
                        />
                      )
                  )}
              </div>
            </div>
          </SortableContext>
        ))}
      </DndContext>
    </div>
  );
};

export default TaskPage;
