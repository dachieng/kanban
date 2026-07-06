"use client";

import { useMutation } from "@apollo/client/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Card, IconButton, TextField, Typography } from "@mui/material";
import { useState, type KeyboardEvent } from "react";

import { spacing } from "@/theme/theme";

import type { Task } from "../interfaces";
import { DELETE_TASK, GET_COLUMNS, UPDATE_TASK } from "../queries";

const TaskCard = ({ task }: { task: Task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [error, setError] = useState<string | null>(null);

  const refetchQueries = [{ query: GET_COLUMNS }];
  const [updateTask, { loading: saving }] = useMutation(UPDATE_TASK, {
    refetchQueries,
  });
  const [deleteTask, { loading: deleting }] = useMutation(DELETE_TASK, {
    refetchQueries,
  });

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id, disabled: isEditing });

  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleCancel = () => {
    setTitle(task.title);
    setIsEditing(false);
    setError(null);
  };

  const handleSave = async () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    try {
      await updateTask({ variables: { id: task.id, title: trimmed } });
      setError(null);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSave();
    if (event.key === "Escape") handleCancel();
  };

  if (isEditing) {
    return (
      <Card
        variant="outlined"
        sx={{ display: "flex", flexDirection: "column", gap: spacing["spacing-sm"], p: spacing["spacing-md"] }}
      >
        <TextField
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={handleKeyDown}
          error={Boolean(error)}
          helperText={error}
          autoFocus
          size="small"
          fullWidth
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: spacing["spacing-sm"] }}>
          <IconButton size="small" aria-label="Cancel edit" onClick={handleCancel}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            aria-label="Save task"
            color="primary"
            onClick={handleSave}
            loading={saving}
            disabled={!title.trim()}
          >
            <CheckIcon fontSize="small" />
          </IconButton>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={dragStyle}
      {...attributes}
      {...listeners}
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: spacing["spacing-sm"],
        p: spacing["spacing-md"],
        cursor: "grab",
        touchAction: "none",
        "&:active": { cursor: "grabbing" },
      }}
    >
      <Typography variant="body2">{task.title}</Typography>
      <Box sx={{ display: "flex", gap: spacing["spacing-xs"], flexShrink: 0 }}>
        <IconButton
          size="small"
          aria-label="Edit task"
          onClick={() => setIsEditing(true)}
          disabled={deleting}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          aria-label="Delete task"
          onClick={() => deleteTask({ variables: { id: task.id } })}
          loading={deleting}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  );
};

export default TaskCard;
