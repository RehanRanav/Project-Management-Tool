"use client";
import { selectTask, updateTask } from "@/app/redux/taskSlice";
import { useAppSelector } from "@/app/redux/store";
import React, { useEffect, useState } from "react";
import TaskColumn from "@/app/ui/Projects/boards/TaskColumn";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { Tasklist } from "@/definition";
import TaskHead from "@/app/ui/Projects/boards/TaskHead";

const TaskPage = () => {
  const tasks = useAppSelector(selectTask);
  const dispatch = useDispatch();
  const [columns, setColumns] = useState<Tasklist[]>(tasks);

  useEffect(() => {
    setColumns(tasks);
  }, [tasks]);
  useEffect(() => {
    dispatch(updateTask(columns));
  }, [columns, dispatch]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 0,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findColumn = (uniqueId: string | null) => {
    if (!uniqueId) return null;

    if (columns.some((column) => column.id === uniqueId)) {
      return columns.find((column) => column.id === uniqueId) ?? null;
    }
    const id = String(uniqueId);
    const itemWithColumnId = columns.flatMap((column) => {
      const columnId = column.id;
      return column.cards.map((card) => ({
        itemId: card.id,
        columnId: columnId,
      }));
    });

    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    return columns.find((column) => column.id === columnId);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }

    setColumns((prevState) => {
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return prevState.map((i) => {
        if (i.id === activeColumn.id) {
          return { ...i, cards: activeItems.filter((i) => i.id !== activeId) };
        } else if (i.id === overColumn.id) {
          return {
            ...i,
            cards: [
              ...overItems.slice(0, newIndex()),
              activeItems[activeIndex],
              ...overItems.slice(newIndex(), overItems.length),
            ],
          };
        } else {
          return i;
        }
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }
    const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId);
    const overIndex = overColumn.cards.findIndex((i) => i.id === overId);
    if (activeIndex !== overIndex) {
      setColumns((prevState) => {
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            return {
              ...column,
              cards: arrayMove(overColumn.cards, activeIndex, overIndex),
            };
          } else {
            return column;
          }
        });
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 px-4 py-6">
      <TaskHead />
      <div className="h-full w-full grid grid-cols-4 gap-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {tasks.map((column) => (
            <TaskColumn
              key={column.id}
              title={column.title}
              id={column.id}
              cards={column.cards}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default TaskPage;
