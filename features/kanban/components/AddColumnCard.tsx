"use client";

import { useMutation } from "@apollo/client/react";
import { Box, Button, Card, CardContent, TextField } from "@mui/material";
import { useState, type KeyboardEvent } from "react";

import { spacing } from "@/theme/theme";

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
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        flexGrow: 0,
        width: { xs: 320, lg: "100%" },
      }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: spacing["spacing-sm"], p: spacing["spacing-xl"] }}
      >
        {isAdding ? (
          <>
            <TextField
              label="Name"
              required
              placeholder="e.g. In Progress"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onKeyDown={handleKeyDown}
              error={Boolean(error)}
              helperText={error}
              autoFocus
              fullWidth
              size="small"
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: spacing["spacing-md"] }}>
              <Button variant="text" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleAdd}
                loading={loading}
                disabled={!name.trim()}
              >
                Add
              </Button>
            </Box>
          </>
        ) : (
          <Button variant="text" fullWidth onClick={() => setIsAdding(true)}>
            Add Column
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default AddColumnCard;
