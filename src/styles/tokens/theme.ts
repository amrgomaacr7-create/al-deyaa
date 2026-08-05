import { darkColorTokens, lightColorTokens } from "./colors";
import { breakpointTokens } from "./breakpoints";
import { durationTokens, easingTokens, motionTokens } from "./motion";
import { radiusTokens } from "./radius";
import { shadowTokens } from "./shadow";
import { spacingTokens } from "./spacing";
import { fontFamilies, fontWeights, typographyTokens } from "./typography";

export const designTokens = {
  color: {
    light: lightColorTokens,
    dark: darkColorTokens
  },
  typography: typographyTokens,
  fontFamily: fontFamilies,
  fontWeight: fontWeights,
  spacing: spacingTokens,
  radius: radiusTokens,
  shadow: shadowTokens,
  motion: motionTokens,
  duration: durationTokens,
  easing: easingTokens,
  breakpoint: breakpointTokens
} as const;

export type ThemeMode = "light" | "dark";
export type DesignTokens = typeof designTokens;
