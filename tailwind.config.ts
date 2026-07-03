import type { Config } from "tailwindcss";

import { colors, semanticColors } from "./theme/theme";

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
    },
  },
} satisfies Config;
