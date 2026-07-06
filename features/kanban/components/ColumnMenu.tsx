"use client";

import { useMutation } from "@apollo/client/react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, CircularProgress, IconButton, Menu, MenuItem } from "@mui/material";
import { useState, type MouseEvent } from "react";

import type { Column } from "../interfaces";
import { CLEAR_COLUMN, DELETE_COLUMN, GET_COLUMNS } from "../queries";

const ColumnMenu = ({
  column,
  onRename,
}: {
  column: Column;
  onRename: () => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const refetchQueries = [{ query: GET_COLUMNS }];
  const [clearColumn, { loading: clearing }] = useMutation(CLEAR_COLUMN, {
    refetchQueries,
  });
  const [deleteColumn, { loading: deleting }] = useMutation(DELETE_COLUMN, {
    refetchQueries,
  });

  const handleOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleRename = () => {
    handleClose();
    onRename();
  };

  const handleClear = async () => {
    await clearColumn({ variables: { id: column.id } });
    handleClose();
  };

  const handleDelete = async () => {
    await deleteColumn({ variables: { id: column.id } });
    handleClose();
  };

  return (
    <>
      <IconButton size="small" aria-label="Column options" onClick={handleOpen}>
        <MoreHorizIcon fontSize="small" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleRename}>Rename</MenuItem>
        <MenuItem onClick={handleClear} disabled={clearing}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            Clear
            {clearing && <CircularProgress size={16} sx={{ ml: 1 }} />}
          </Box>
        </MenuItem>
        <MenuItem onClick={handleDelete} disabled={deleting} sx={{ color: "error.main" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            Delete
            {deleting && <CircularProgress size={16} color="error" sx={{ ml: 1 }} />}
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ColumnMenu;
