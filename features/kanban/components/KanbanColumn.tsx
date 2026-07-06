"use client";

import { useMutation } from "@apollo/client/react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Check, X } from "lucide-react";
import { useState, type KeyboardEvent } from "react";

import Button from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import Input from "@/components/ui/Input";

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
  const [createTask, { loading }] = useMutation(CREATE_TASK, {
    refetchQueries,
  });
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
    <Card className="flex w-80 shrink-0 grow-0 flex-col lg:w-full">
      <CardHeader className="p-spacing-xl">
        <div className="flex items-center justify-between gap-spacing-md">
          {isEditingName ? (
            <div className="flex flex-1 flex-col gap-spacing-xs">
              <div className="flex items-center gap-spacing-xs">
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  onKeyDown={handleNameKeyDown}
                  error={renameError ?? undefined}
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Cancel rename"
                  className="text-secondary-500 hover:bg-transparent hover:text-secondary-900"
                  onClick={handleCancelName}
                >
                  <X className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Save name"
                  onClick={handleSaveName}
                  loading={renaming}
                  disabled={!name.trim()}
                >
                  <Check className="size-4" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm leading-sm font-semibold text-secondary-900">
                {column.name}
              </p>
              <ColumnMenu
                column={column}
                onRename={() => setIsEditingName(true)}
              />
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-spacing-md px-spacing-xl py-spacing-md">
        <div
          ref={setDroppableRef}
          className="flex flex-1 flex-col gap-spacing-md"
        >
          <SortableContext
            items={column.tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {column.tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-spacing-sm px-spacing-xl pt-spacing-md pb-spacing-xl">
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={() => setIsAddingTask(true)}
        >
          Add Card
        </Button>
        {isAddingTask && (
          <Card className="flex flex-col gap-spacing-sm p-spacing-md shadow-none">
            <Input
              label="Title"
              required
              placeholder="e.g. Create a reusable button component"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={handleTaskKeyDown}
              error={taskError ?? undefined}
              autoFocus
            />
            <div className="flex justify-between gap-spacing-md">
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleAddTask}
                loading={loading}
                disabled={!title.trim()}
              >
                Add
              </Button>
            </div>
          </Card>
        )}
      </CardFooter>
    </Card>
  );
};

export default KanbanColumn;
