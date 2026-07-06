"use client";

import { useMutation } from "@apollo/client/react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Card, CardContent, IconButton, TextField, Typography } from "@mui/material";
import { useState, type KeyboardEvent } from "react";

import { spacing } from "@/theme/theme";

import type { Column } from "../interfaces";
import { CREATE_TASK, GET_COLUMNS, RENAME_COLUMN } from "../queries";
import ColumnMenu from "./ColumnMenu";
import TaskCard from "./TaskCard";

const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Something went wrong.";

const KanbanColumn = ({ column }: { column: Column }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [title, setTitle] = useState("");
  const [taskError, setTaskError] = useState<string | null>(null);

  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(column.name);
  const [renameError, setRenameError] = useState<string | null>(null);

  const refetchQueries = [{ query: GET_COLUMNS }];
  const [createTask, { loading }] = useMutation(CREATE_TASK, { refetchQueries });
  const [renameColumn, { loading: renaming }] = useMutation(RENAME_COLUMN, {
    refetchQueries,
  });

  const handleAddTask = async () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    try {
      await createTask({ variables: { columnId: column.id, title: trimmed } });
      setTitle("");
      setTaskError(null);
      setIsAddingTask(false);
    } catch (err) {
      setTaskError(errorMessage(err));
    }
  };

  const handleCancel = () => {
    setIsAddingTask(false);
    setTitle("");
    setTaskError(null);
  };

  const handleTaskKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleAddTask();
    if (event.key === "Escape") handleCancel();
  };

  const handleSaveName = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    try {
      await renameColumn({ variables: { id: column.id, name: trimmed } });
      setRenameError(null);
      setIsEditingName(false);
    } catch (err) {
      setRenameError(errorMessage(err));
    }
  };

  const handleCancelName = () => {
    setName(column.name);
    setIsEditingName(false);
    setRenameError(null);
  };

  const handleNameKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSaveName();
    if (event.key === "Escape") handleCancelName();
  };

  const { setNodeRef: setDroppableRef } = useDroppable({ id: column.id });

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        flexGrow: 0,
        width: { xs: 320, lg: "100%" },
      }}
    >
      <CardContent sx={{ borderBottom: "1px solid", borderColor: "divider", p: spacing["spacing-xl"] }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: spacing["spacing-md"] }}>
          {isEditingName ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: spacing["spacing-xs"], flex: 1 }}>
              <TextField
                value={name}
                onChange={(event) => setName(event.target.value)}
                onKeyDown={handleNameKeyDown}
                error={Boolean(renameError)}
                helperText={renameError}
                autoFocus
                size="small"
                fullWidth
              />
              <IconButton size="small" aria-label="Cancel rename" onClick={handleCancelName}>
                <CloseIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="Save name"
                color="primary"
                onClick={handleSaveName}
                loading={renaming}
                disabled={!name.trim()}
              >
                <CheckIcon fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {column.name}
              </Typography>
              <ColumnMenu column={column} onRename={() => setIsEditingName(true)} />
            </>
          )}
        </Box>
      </CardContent>
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: spacing["spacing-md"],
          px: spacing["spacing-xl"],
          py: spacing["spacing-md"],
        }}
      >
        <Box
          ref={setDroppableRef}
          sx={{ display: "flex", flex: 1, flexDirection: "column", gap: spacing["spacing-md"] }}
        >
          <SortableContext
            items={column.tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {column.tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </Box>
      </CardContent>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: spacing["spacing-sm"],
          borderTop: "1px solid",
          borderColor: "divider",
          px: spacing["spacing-xl"],
          pt: spacing["spacing-md"],
          pb: spacing["spacing-xl"],
        }}
      >
        {isAddingTask && (
          <Card
            variant="outlined"
            sx={{ display: "flex", flexDirection: "column", gap: spacing["spacing-sm"], p: spacing["spacing-md"] }}
          >
            <TextField
              label="Title"
              required
              placeholder="e.g. Create a reusable button component"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={handleTaskKeyDown}
              error={Boolean(taskError)}
              helperText={taskError}
              autoFocus
              size="small"
              fullWidth
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: spacing["spacing-md"] }}>
              <Button variant="text" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleAddTask}
                loading={loading}
                disabled={!title.trim()}
              >
                Add
              </Button>
            </Box>
          </Card>
        )}
        <Button variant="text" fullWidth onClick={() => setIsAddingTask(true)}>
          Add Card
        </Button>
      </CardContent>
    </Card>
  );
};

export default KanbanColumn;
