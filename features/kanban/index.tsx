"use client";

import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import { Box, Card, Typography } from "@mui/material";

import { spacing } from "@/theme/theme";

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
    <Box sx={{ display: "flex", flexDirection: "column", gap: spacing["spacing-2xl"], p: spacing["spacing-3xl"] }}>
      <KanbanHeader />

      {!loading && !error && !isRetrying && atColumnLimit && (
        <Typography variant="body2" color="error.main">
          You can only create up to 5 columns.
        </Typography>
      )}

      {loading || isRetrying ? (
        <>
          {isRetrying && (
            <Typography variant="body2" color="text.secondary">
              Having trouble reaching the database, retrying… (attempt{" "}
              {attempt + 1} of {maxRetries})
            </Typography>
          )}
          <BoardSkeleton />
        </>
      ) : error ? (
        <Typography variant="body2" color="error.main">
          Couldn&apos;t load the board: {error.message}
        </Typography>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <Box
            sx={{
              display: { xs: "flex", lg: "grid" },
              gridTemplateColumns: { lg: "repeat(5, 1fr)" },
              alignItems: "flex-start",
              gap: spacing["spacing-xl"],
              overflowX: "auto",
              pb: spacing["spacing-md"],
            }}
          >
            {columns.map((column) => (
              <KanbanColumn key={column.id} column={column} />
            ))}
            {!atColumnLimit && <AddColumnCard />}
          </Box>
          <DragOverlay>
            {activeTask && (
              <Card sx={{ display: "flex", alignItems: "flex-start", gap: spacing["spacing-sm"], p: spacing["spacing-md"] }}>
                <Typography variant="body2">{activeTask.title}</Typography>
              </Card>
            )}
          </DragOverlay>
        </DndContext>
      )}
    </Box>
  );
};

export default KanbanBoard;
