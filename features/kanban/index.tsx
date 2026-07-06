"use client";

import { useQuery } from "@apollo/client/react";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";

import { Card } from "@/components/ui/Card";

import AddColumnCard from "./components/AddColumnCard";
import BoardSkeleton from "./components/BoardSkeleton";
import { useKanbanDnd } from "./hooks/useKanbanDnd";
import KanbanColumn from "./components/KanbanColumn";
import KanbanHeader from "./components/KanbanHeader";
import type { GetColumnsData } from "./interfaces";
import { GET_COLUMNS } from "./queries";

const MAX_COLUMNS = 5;

const KanbanBoard = () => {
  const { data, loading, error } = useQuery<GetColumnsData>(GET_COLUMNS);
  const {
    columns,
    activeTask,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useKanbanDnd(data?.columns);

  const atColumnLimit = columns.length >= MAX_COLUMNS;

  return (
    <div className="flex flex-col gap-spacing-2xl p-spacing-3xl">
      <KanbanHeader />

      {!loading && !error && atColumnLimit && (
        <p className="text-sm leading-sm text-error">
          You can only create up to 5 columns.
        </p>
      )}

      {loading ? (
        <BoardSkeleton />
      ) : error ? (
        <p className="text-sm leading-sm text-error">
          Couldn&apos;t load the board: {error.message}
        </p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex items-start gap-spacing-xl overflow-x-auto pb-spacing-md lg:grid lg:grid-cols-5">
            {columns.map((column) => (
              <KanbanColumn key={column.id} column={column} />
            ))}
            {!atColumnLimit && <AddColumnCard />}
          </div>
          <DragOverlay>
            {activeTask && (
              <Card className="flex items-start gap-spacing-sm p-spacing-md shadow-md">
                <p className="text-sm leading-sm text-secondary-900">
                  {activeTask.title}
                </p>
              </Card>
            )}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
};

export default KanbanBoard;
