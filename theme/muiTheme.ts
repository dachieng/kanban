import { createTheme } from "@mui/material/styles";

import { colors, radii, semanticColors, spacing, widths } from "./theme";
import { fontSizes, fontWeights, lineHeights } from "./typography";

declare module "@mui/material/styles" {
  interface Theme {
    radii: typeof radii;
    tokens: {
      spacing: typeof spacing;
      widths: typeof widths;
    };
  }
  interface ThemeOptions {
    radii?: typeof radii;
    tokens?: {
      spacing: typeof spacing;
      widths: typeof widths;
    };
  }
}

const toPx = (value: string) => parseInt(value, 10);

const muiTheme = createTheme({
  palette: {
    primary: {
      light: semanticColors.brand.light,
      main: semanticColors.brand.DEFAULT,
      dark: semanticColors.brand.dark,
      contrastText: "#FFFFFF",
    },
    error: {
      light: semanticColors.error.light,
      main: semanticColors.error.DEFAULT,
      dark: semanticColors.error.dark,
    },
    warning: {
      light: semanticColors.warning.light,
      main: semanticColors.warning.DEFAULT,
      dark: semanticColors.warning.dark,
    },
    success: {
      light: semanticColors.success.light,
      main: semanticColors.success.DEFAULT,
      dark: semanticColors.success.dark,
    },
    grey: {
      50: colors.secondary[50],
      100: colors.secondary[100],
      200: colors.secondary[200],
      300: colors.secondary[300],
      400: colors.secondary[400],
      500: colors.secondary[500],
      600: colors.secondary[600],
      700: colors.secondary[700],
      800: colors.secondary[800],
      900: colors.secondary[900],
    },
    text: {
      primary: colors.secondary[900],
      secondary: colors.secondary[500],
      disabled: colors.secondary[400],
    },
    divider: colors.secondary[200],
    background: {
      default: colors.secondary[300],
      paper: "#FFFFFF",
    },
  },
  shape: {
    borderRadius: toPx(radii.md),
  },
  breakpoints: {
    values: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: fontSizes["display-2xl"],
      lineHeight: lineHeights["display-2xl"],
      fontWeight: fontWeights.bold,
    },
    h2: {
      fontSize: fontSizes["display-xl"],
      lineHeight: lineHeights["display-xl"],
      fontWeight: fontWeights.bold,
    },
    h3: {
      fontSize: fontSizes["display-lg"],
      lineHeight: lineHeights["display-lg"],
      fontWeight: fontWeights.semibold,
    },
    h4: {
      fontSize: fontSizes["display-md"],
      lineHeight: lineHeights["display-md"],
      fontWeight: fontWeights.semibold,
    },
    h5: {
      fontSize: fontSizes["display-sm"],
      lineHeight: lineHeights["display-sm"],
      fontWeight: fontWeights.semibold,
    },
    h6: {
      fontSize: fontSizes["display-xs"],
      lineHeight: lineHeights["display-xs"],
      fontWeight: fontWeights.semibold,
    },
    subtitle1: {
      fontSize: fontSizes.xl,
      lineHeight: lineHeights.xl,
      fontWeight: fontWeights.medium,
    },
    subtitle2: {
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.lg,
      fontWeight: fontWeights.medium,
    },
    body1: {
      fontSize: fontSizes.md,
      lineHeight: lineHeights.md,
      fontWeight: fontWeights.regular,
    },
    body2: {
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: fontWeights.regular,
    },
    button: {
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: fontWeights.semibold,
      textTransform: "none",
    },
    caption: {
      fontSize: fontSizes.xxs,
      lineHeight: lineHeights.xs,
      fontWeight: fontWeights.regular,
    },
  },
  radii,
  tokens: { spacing, widths },
});

export { muiTheme };
