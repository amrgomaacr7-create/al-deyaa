import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      mobile: "320px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
      ultraWide: "1536px"
    },
    spacing: {
      4: "var(--space-4)",
      8: "var(--space-8)",
      12: "var(--space-12)",
      16: "var(--space-16)",
      20: "var(--space-20)",
      24: "var(--space-24)",
      32: "var(--space-32)",
      40: "var(--space-40)",
      48: "var(--space-48)",
      64: "var(--space-64)",
      80: "var(--space-80)",
      96: "var(--space-96)"
    },
    fontFamily: {
      sans: "var(--font-family-sans)",
      arabic: "var(--font-family-arabic)",
      mono: "var(--font-family-mono)"
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700"
    },
    extend: {
      fontSize: {
        display: [
          "var(--font-size-display)",
          {
            lineHeight: "var(--line-height-display)",
            letterSpacing: "var(--letter-spacing-display)"
          }
        ],
        h1: [
          "var(--font-size-h1)",
          {
            lineHeight: "var(--line-height-h1)",
            letterSpacing: "var(--letter-spacing-h1)"
          }
        ],
        h2: [
          "var(--font-size-h2)",
          {
            lineHeight: "var(--line-height-h2)",
            letterSpacing: "var(--letter-spacing-h2)"
          }
        ],
        h3: [
          "var(--font-size-h3)",
          {
            lineHeight: "var(--line-height-h3)",
            letterSpacing: "var(--letter-spacing-h3)"
          }
        ],
        "body-large": [
          "var(--font-size-body-large)",
          {
            lineHeight: "var(--line-height-body-large)",
            letterSpacing: "var(--letter-spacing-body-large)"
          }
        ],
        body: [
          "var(--font-size-body)",
          {
            lineHeight: "var(--line-height-body)",
            letterSpacing: "var(--letter-spacing-body)"
          }
        ],
        small: [
          "var(--font-size-small)",
          {
            lineHeight: "var(--line-height-small)",
            letterSpacing: "var(--letter-spacing-small)"
          }
        ],
        caption: [
          "var(--font-size-caption)",
          {
            lineHeight: "var(--line-height-caption)",
            letterSpacing: "var(--letter-spacing-caption)"
          }
        ]
      },
      colors: {
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-muted": "var(--color-primary-muted)",
        secondary: "var(--color-secondary)",
        "secondary-hover": "var(--color-secondary-hover)",
        "secondary-muted": "var(--color-secondary-muted)",
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        "accent-muted": "var(--color-accent-muted)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
        info: "var(--color-info)",
        background: "var(--color-background)",
        "background-elevated": "var(--color-background-elevated)",
        surface: "var(--color-surface)",
        "surface-raised": "var(--color-surface-raised)",
        card: "var(--color-card)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        text: "var(--color-text)",
        "text-soft": "var(--color-text-soft)",
        muted: "var(--color-muted)",
        disabled: "var(--color-disabled)",
        overlay: "var(--color-overlay)",
        "focus-ring": "var(--color-focus-ring)",
        selection: "var(--color-selection)"
      },
      borderRadius: {
        small: "var(--radius-small)",
        medium: "var(--radius-medium)",
        large: "var(--radius-large)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        pill: "var(--radius-pill)"
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        large: "var(--shadow-large)",
        floating: "var(--shadow-floating)",
        modal: "var(--shadow-modal)"
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)"
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
        emphasized: "var(--ease-emphasized)",
        focus: "var(--ease-focus)"
      }
    }
  }
};

export default config;
