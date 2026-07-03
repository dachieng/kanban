export type ColorScale = Partial<
  Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>
>;

export const colors = {
  brand: {
    50: "#EBF6EB",
    100: "#CFEACF",
    200: "#A8DAAA",
    300: "#80C882",
    400: "#59B85D",
    500: "#35A839",
    600: "#2D8F30",
    700: "#267728",
    800: "#1E6020",
    900: "#184C1A",
  },
  secondary: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E9EAEB",
    300: "#D5D7DA",
    400: "#A4A7AE",
    500: "#717680",
    600: "#535862",
    700: "#414651",
    800: "#252B37",
    900: "#181D27",
  },
  error: {
    50: "#FEF3F2",
    100: "#FEE4E2",
    200: "#FECDCA",
    300: "#FDA29B",
    400: "#F97066",
    500: "#F04438",
    600: "#D92D20",
    700: "#B42318",
  },
  warning: {
    50: "#FFFAEB",
    100: "#FEF0C7",
    200: "#FEDF89",
    300: "#FEC84B",
    400: "#FDB022",
    500: "#F79009",
    600: "#DC6803",
    700: "#B54708",
  },
  success: {
    50: "#ECFDF3",
    100: "#DCFAE6",
    200: "#ABEFC6",
    300: "#75E0A7",
    400: "#47CD89",
    500: "#17B26A",
    600: "#079455",
    700: "#067647",
  },
} satisfies Record<string, ColorScale>;

interface SemanticColor {
  light: string;
  DEFAULT: string;
  dark: string;
}

export const semanticColors = {
  brand: {
    light: colors.brand[100],
    DEFAULT: colors.brand[500],
    dark: colors.brand[800],
  },
  secondary: {
    light: colors.secondary[300],
    DEFAULT: colors.secondary[700],
    dark: colors.secondary[800],
  },
  error: {
    light: colors.error[100],
    DEFAULT: colors.error[600],
    dark: colors.error[700],
  },
  warning: {
    light: colors.warning[300],
    DEFAULT: colors.warning[600],
    dark: colors.warning[700],
  },
  success: {
    light: colors.success[100],
    DEFAULT: colors.success[600],
    dark: colors.success[700],
  },
} satisfies Record<string, SemanticColor>;

export type RadiusName =
  | "none"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "full";

export const radii: Record<RadiusName, string> = {
  none: "0px",
  xxs: "2px",
  xs: "4px",
  sm: "6px",
  md: "8px",
  lg: "10px",
  xl: "12px",
  "2xl": "16px",
  "3xl": "20px",
  "4xl": "24px",
  full: "9999px",
};
