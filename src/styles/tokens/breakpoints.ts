export const breakpointTokens = {
  mobile: "320px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1280px",
  ultraWide: "1536px"
} as const;

export type BreakpointToken = keyof typeof breakpointTokens;
