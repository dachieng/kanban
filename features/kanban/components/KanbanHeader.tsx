import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Breadcrumbs, Typography } from "@mui/material";

import { spacing } from "@/theme/theme";

const breadcrumbs = ["Dashboard", "Kanban"];

const KanbanHeader = () => (
  <Box
    component="header"
    sx={{ display: "flex", flexDirection: "column", gap: spacing["spacing-xs"] }}
  >
    <Typography variant="h6">Kanban</Typography>
    <Breadcrumbs
      separator={<ChevronRightIcon sx={{ fontSize: 16, color: "text.disabled" }} />}
    >
      {breadcrumbs.map((crumb, index) => (
        <Typography
          key={crumb}
          variant="body2"
          sx={{
            color: index === breadcrumbs.length - 1 ? "text.primary" : "text.secondary",
            fontWeight: index === breadcrumbs.length - 1 ? 500 : 400,
          }}
        >
          {crumb}
        </Typography>
      ))}
    </Breadcrumbs>
  </Box>
);

export default KanbanHeader;
