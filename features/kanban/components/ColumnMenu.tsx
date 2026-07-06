"use client";

import { useMutation } from "@apollo/client/react";
import { Loader2, MoreHorizontal } from "lucide-react";
import { useState } from "react";

import Button from "@/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

import type { Column } from "../interfaces";
import { CLEAR_COLUMN, DELETE_COLUMN, GET_COLUMNS } from "../queries";

const ColumnMenu = ({
  column,
  onRename,
}: {
  column: Column;
  onRename: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const refetchQueries = [{ query: GET_COLUMNS }];
  const [clearColumn, { loading: clearing }] = useMutation(CLEAR_COLUMN, {
    refetchQueries,
  });
  const [deleteColumn, { loading: deleting }] = useMutation(DELETE_COLUMN, {
    refetchQueries,
  });

  const handleRename = () => {
    setOpen(false);
    onRename();
  };

  const handleClear = async () => {
    await clearColumn({ variables: { id: column.id } });
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteColumn({ variables: { id: column.id } });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Column options"
          className="text-secondary-500 hover:bg-transparent hover:text-secondary-900"
        >
          <MoreHorizontal className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48 min-w-0 p-spacing-sm">
        <div className="flex flex-col">
          <button
            type="button"
            className="radius-md cursor-pointer px-spacing-md py-spacing-sm text-left text-sm text-secondary-900 hover:bg-secondary-light"
            onClick={handleRename}
          >
            Rename
          </button>
          <button
            type="button"
            disabled={clearing}
            className="radius-md flex cursor-pointer items-center justify-between px-spacing-md py-spacing-sm text-left text-sm text-secondary-900 hover:bg-secondary-light disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleClear}
          >
            Clear
            {clearing && <Loader2 className="size-4 animate-spin" />}
          </button>
          <button
            type="button"
            disabled={deleting}
            className="radius-md flex cursor-pointer items-center justify-between px-spacing-md py-spacing-sm text-left text-sm text-error hover:bg-error-light disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleDelete}
          >
            Delete
            {deleting && <Loader2 className="size-4 animate-spin" />}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColumnMenu;
