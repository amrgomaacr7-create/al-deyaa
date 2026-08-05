import type { Preview } from "@storybook/nextjs";

import { ThemeProvider, type ThemeMode } from "../src/shared/ui";
import { breakpointTokens } from "../src/styles/tokens";
import "../src/styles/globals.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Al-Deyaa theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
          { value: "system", title: "System" }
        ],
        dynamicTitle: true
      }
    }
  },
  parameters: {
    actions: {
      argTypesRegex: "^on[A-Z].*"
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      toc: true
    },
    a11y: {
      test: "todo"
    },
    backgrounds: {
      disable: true
    },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: breakpointTokens.mobile,
            height: "640px"
          }
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: breakpointTokens.tablet,
            height: "1024px"
          }
        },
        laptop: {
          name: "Laptop",
          styles: {
            width: breakpointTokens.laptop,
            height: "768px"
          }
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: breakpointTokens.desktop,
            height: "800px"
          }
        },
        ultraWide: {
          name: "Ultra Wide",
          styles: {
            width: breakpointTokens.ultraWide,
            height: "900px"
          }
        }
      }
    },
    layout: "padded"
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as ThemeMode;

      return (
        <ThemeProvider defaultTheme={theme} key={theme} storageKey={`al-deyaa-storybook-theme-${theme}`}>
          <div className="min-h-screen bg-background text-text">
            <Story />
          </div>
        </ThemeProvider>
      );
    }
  ],
  tags: ["autodocs"]
};

export default preview;
