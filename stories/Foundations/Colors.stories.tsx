import type { Meta, StoryObj } from "@storybook/nextjs";

import { Body, Caption, Grid, Stack, Title } from "@/shared/ui";

const colorTokens = [
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "danger",
  "info",
  "background",
  "background-elevated",
  "surface",
  "surface-raised",
  "card",
  "border",
  "border-strong",
  "text",
  "text-soft",
  "muted",
  "disabled",
  "overlay",
  "focus-ring",
  "selection"
] as const;

const meta = {
  title: "Foundations/Colors",
  parameters: {
    docs: {
      description: {
        component:
          "Semantic color tokens for Al-Deyaa. Components should reference these names, not raw color values."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SemanticColors: Story = {
  render: () => (
    <Stack gap={24}>
      <Stack gap={8}>
        <Title>Semantic colors</Title>
        <Body color="soft">Theme-aware tokens used by every component.</Body>
      </Stack>

      <Grid columns={3} gap={16}>
        {colorTokens.map((token) => (
          <Stack
            key={token}
            className="rounded-large border border-border bg-surface p-16 shadow-soft"
            gap={12}
          >
            <div
              aria-hidden="true"
              className="h-48 rounded-medium border border-border"
              style={{ background: `var(--color-${token})` }}
            />
            <Caption as="p" color="soft">
              --color-{token}
            </Caption>
          </Stack>
        ))}
      </Grid>
    </Stack>
  )
};
