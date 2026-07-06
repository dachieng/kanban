import { useMutation } from "@apollo/client/react";
import {
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

import type { Column, Task } from "../interfaces";
import { GET_COLUMNS, MOVE_TASK } from "../queries";

const findColumnOf = (columns: Column[], id: string) =>
  columns.find((column) => column.tasks.some((task) => task.id === id));

const useKanbanDnd = (queryColumns: Column[] | undefined) => {
  const [moveTask] = useMutation(MOVE_TASK, {
    refetchQueries: [{ query: GET_COLUMNS }],
  });

  const [columns, setColumns] = useState<Column[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    if (queryColumns) setColumns(queryColumns);
  }, [queryColumns]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = String(event.active.id);
    const task = columns
      .flatMap((column) => column.tasks)
      .find((t) => t.id === taskId);
    setActiveTask(task ?? null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    const sourceColumn = findColumnOf(columns, activeId);
    const destColumn =
      findColumnOf(columns, overId) ?? columns.find((c) => c.id === overId);
    if (!sourceColumn || !destColumn || sourceColumn.id === destColumn.id)
      return;

    setColumns((prev) => {
      const next = prev.map((column) => ({
        ...column,
        tasks: [...column.tasks],
      }));
      const from = next.find((column) => column.id === sourceColumn.id)!;
      const to = next.find((column) => column.id === destColumn.id)!;
      const activeIndex = from.tasks.findIndex((task) => task.id === activeId);
      const [movedTask] = from.tasks.splice(activeIndex, 1);
      const overIndex = to.tasks.findIndex((task) => task.id === overId);
      to.tasks.splice(
        overIndex >= 0 ? overIndex : to.tasks.length,
        0,
        movedTask,
      );
      return next;
    });
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const sourceColumn = findColumnOf(columns, activeId);
    const destColumn =
      findColumnOf(columns, overId) ?? columns.find((c) => c.id === overId);
    if (!sourceColumn || !destColumn) return;

    let toIndex = destColumn.tasks.findIndex((task) => task.id === overId);
    if (toIndex === -1) toIndex = Math.max(destColumn.tasks.length - 1, 0);

    if (sourceColumn.id === destColumn.id) {
      const fromIndex = sourceColumn.tasks.findIndex(
        (task) => task.id === activeId,
      );
      if (fromIndex !== toIndex) {
        setColumns((prev) =>
          prev.map((column) =>
            column.id === destColumn.id
              ? {
                  ...column,
                  tasks: arrayMove(column.tasks, fromIndex, toIndex),
                }
              : column,
          ),
        );
      }
    }

    await moveTask({
      variables: { id: activeId, toColumnId: destColumn.id, toIndex },
    });
  };

  return {
    columns,
    activeTask,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};

export { useKanbanDnd };
