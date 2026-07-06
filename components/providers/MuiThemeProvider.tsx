"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import type { ReactNode } from "react";

import { muiTheme } from "@/theme/muiTheme";

const MuiThemeProvider = ({ children }: { children: ReactNode }) => (
  <AppRouterCacheProvider>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </AppRouterCacheProvider>
);

export default MuiThemeProvider;
