"use client";

import { useMutation } from "@apollo/client/react";
import { useState, type KeyboardEvent } from "react";

import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";

import { CREATE_COLUMN, GET_COLUMNS } from "../queries";

const AddColumnCard = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [createColumn, { loading }] = useMutation(CREATE_COLUMN, {
    refetchQueries: [{ query: GET_COLUMNS }],
  });

  const handleAdd = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    try {
      await createColumn({ variables: { name: trimmed } });
      setName("");
      setError(null);
      setIsAdding(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setName("");
    setError(null);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleAdd();
    if (event.key === "Escape") handleCancel();
  };

  return (
    <Card className="flex w-80 shrink-0 grow-0 flex-col lg:w-full">
      <CardContent className="flex flex-col gap-spacing-sm p-spacing-xl">
        {isAdding ? (
          <>
            <Input
              label="Name"
              required
              placeholder="e.g. In Progress"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onKeyDown={handleKeyDown}
              error={error ?? undefined}
              autoFocus
            />
            <div className="flex justify-between gap-spacing-md">
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleAdd}
                loading={loading}
                disabled={!name.trim()}
              >
                Add
              </Button>
            </div>
          </>
        ) : (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => setIsAdding(true)}
          >
            Add Column
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default AddColumnCard;
