import type { Config } from "tailwindcss";

import {
  colors,
  paragraphMaxWidth,
  radii,
  semanticColors,
  spacing,
  widths,
} from "./theme/theme";
import { fontSizes, fontWeights, lineHeights } from "./theme/typography";

function toTailwindScale(name: keyof typeof colors) {
  return {
    ...colors[name],
    DEFAULT: semanticColors[name].DEFAULT,
    light: semanticColors[name].light,
    dark: semanticColors[name].dark,
  };
}

export default {
  theme: {
    extend: {
      colors: {
        brand: toTailwindScale("brand"),
        secondary: toTailwindScale("secondary"),
        error: toTailwindScale("error"),
        warning: toTailwindScale("warning"),
        success: toTailwindScale("success"),
      },
      fontWeight: {
        regular: String(fontWeights.regular),
        medium: String(fontWeights.medium),
        semibold: String(fontWeights.semibold),
        bold: String(fontWeights.bold),
      },
      fontSize: fontSizes,
      lineHeight: lineHeights,
      borderRadius: radii,
      spacing,
      width: widths,
      maxWidth: {
        paragraph: paragraphMaxWidth,
      },
    },
  },
} satisfies Config;
