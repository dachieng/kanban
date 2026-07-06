"use client";

import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";

import { Card } from "@/components/ui/Card";

import AddColumnCard from "./components/AddColumnCard";
import BoardSkeleton from "./components/BoardSkeleton";
import KanbanColumn from "./components/KanbanColumn";
import KanbanHeader from "./components/KanbanHeader";
import { useBoardData } from "./hooks/useBoardData";
import { useKanbanDnd } from "./hooks/useKanbanDnd";

const MAX_COLUMNS = 5;

const KanbanBoard = () => {
  const { columns: boardColumns, loading, error, isRetrying, attempt, maxRetries } =
    useBoardData();
  const {
    columns,
    activeTask,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useKanbanDnd(boardColumns);

  const atColumnLimit = columns.length >= MAX_COLUMNS;

  return (
    <div className="flex flex-col gap-spacing-2xl p-spacing-3xl">
      <KanbanHeader />

      {!loading && !error && !isRetrying && atColumnLimit && (
        <p className="text-sm leading-sm text-error">
          You can only create up to 5 columns.
        </p>
      )}

      {loading || isRetrying ? (
        <>
          {isRetrying && (
            <p className="text-sm leading-sm text-secondary-500">
              Having trouble reaching the database, retrying… (attempt{" "}
              {attempt + 1} of {maxRetries})
            </p>
          )}
          <BoardSkeleton />
        </>
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
