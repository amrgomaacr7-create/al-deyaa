export const radiusTokens = {
  small: "0.375rem",
  medium: "0.5rem",
  large: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  pill: "999rem"
} as const;

export type RadiusToken = keyof typeof radiusTokens;
