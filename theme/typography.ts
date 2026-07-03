export type FontWeightName = "regular" | "medium" | "semibold" | "bold";

export const fontWeights: Record<FontWeightName, number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export type FontSizeName =
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "display-xs"
  | "display-sm"
  | "display-md"
  | "display-lg"
  | "display-xl"
  | "display-2xl";

export const fontSizes: Record<FontSizeName, string> = {
  xxs: "10px",
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
  "display-xs": "24px",
  "display-sm": "30px",
  "display-md": "36px",
  "display-lg": "48px",
  "display-xl": "60px",
  "display-2xl": "72px",
};

export type LineHeightName =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "display-xs"
  | "display-sm"
  | "display-md"
  | "display-lg"
  | "display-xl"
  | "display-2xl";

export const lineHeights: Record<LineHeightName, string> = {
  xs: "18px",
  sm: "20px",
  md: "24px",
  lg: "28px",
  xl: "30px",
  "display-xs": "32px",
  "display-sm": "38px",
  "display-md": "44px",
  "display-lg": "60px",
  "display-xl": "72px",
  "display-2xl": "90px",
};
