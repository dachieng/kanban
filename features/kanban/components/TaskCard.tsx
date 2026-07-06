"use client";

import { useMutation } from "@apollo/client/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useState, type KeyboardEvent } from "react";

import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Input from "@/components/ui/Input";

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
  const [deleteTask] = useMutation(DELETE_TASK, { refetchQueries });

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
      <Card className="flex flex-col gap-spacing-sm p-spacing-md shadow-none">
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={handleKeyDown}
          error={error ?? undefined}
          autoFocus
        />
        <div className="flex justify-end gap-spacing-sm">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Cancel edit"
            className="text-secondary-500 hover:bg-transparent hover:text-secondary-900"
            onClick={handleCancel}
          >
            <X className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Save task"
            onClick={handleSave}
            loading={saving}
            disabled={!title.trim()}
          >
            <Check className="size-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={dragStyle}
      {...attributes}
      {...listeners}
      className="flex touch-none cursor-grab items-start justify-between gap-spacing-sm p-spacing-md shadow-none active:cursor-grabbing"
    >
      <p className="text-sm leading-sm text-secondary-900">{task.title}</p>
      <div className="flex shrink-0 gap-spacing-xs">
        <Button
          variant="ghost"
          size="sm"
          aria-label="Edit task"
          className="text-secondary-400 hover:bg-transparent hover:text-secondary-900"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Delete task"
          className="text-secondary-400 hover:bg-transparent hover:text-error"
          onClick={() => deleteTask({ variables: { id: task.id } })}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </Card>
  );
};

export default TaskCard;
