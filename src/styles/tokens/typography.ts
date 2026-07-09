export const fontFamilies = {
  sans: "var(--font-family-sans)",
  arabic: "var(--font-family-arabic)",
  mono: "var(--font-family-mono)"
} as const;

export const fontWeights = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700"
} as const;

export const typographyTokens = {
  display: {
    fontSize: "3.5rem",
    lineHeight: "1.08",
    letterSpacing: "0",
    fontWeight: fontWeights.bold
  },
  h1: {
    fontSize: "2.5rem",
    lineHeight: "1.12",
    letterSpacing: "0",
    fontWeight: fontWeights.bold
  },
  h2: {
    fontSize: "2rem",
    lineHeight: "1.18",
    letterSpacing: "0",
    fontWeight: fontWeights.semibold
  },
  h3: {
    fontSize: "1.5rem",
    lineHeight: "1.25",
    letterSpacing: "0",
    fontWeight: fontWeights.semibold
  },
  bodyLarge: {
    fontSize: "1.125rem",
    lineHeight: "1.75",
    letterSpacing: "0",
    fontWeight: fontWeights.regular
  },
  body: {
    fontSize: "1rem",
    lineHeight: "1.7",
    letterSpacing: "0",
    fontWeight: fontWeights.regular
  },
  small: {
    fontSize: "0.875rem",
    lineHeight: "1.55",
    letterSpacing: "0",
    fontWeight: fontWeights.regular
  },
  caption: {
    fontSize: "0.75rem",
    lineHeight: "1.45",
    letterSpacing: "0.01em",
    fontWeight: fontWeights.medium
  }
} as const;

export type TypographyToken = keyof typeof typographyTokens;
