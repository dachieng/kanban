import { Box, Card, CardContent, Skeleton } from "@mui/material";

import { spacing } from "@/theme/theme";

const SKELETON_COLUMNS = 3;

const ColumnSkeleton = () => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      flexGrow: 0,
      minHeight: 384,
      width: { xs: 320, lg: "100%" },
    }}
  >
    <CardContent sx={{ borderBottom: "1px solid", borderColor: "divider", p: spacing["spacing-xl"] }}>
      <Skeleton variant="text" width={96} height={20} />
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
      <Skeleton variant="rounded" height={56} />
      <Skeleton variant="rounded" height={56} />
    </CardContent>
    <CardContent
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        px: spacing["spacing-xl"],
        pt: spacing["spacing-md"],
        pb: spacing["spacing-xl"],
      }}
    >
      <Skeleton variant="rounded" height={36} />
    </CardContent>
  </Card>
);

const BoardSkeleton = () => (
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
    {Array.from({ length: SKELETON_COLUMNS }).map((_, index) => (
      <ColumnSkeleton key={index} />
    ))}
  </Box>
);

export default BoardSkeleton;
