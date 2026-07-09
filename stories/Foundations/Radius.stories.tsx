import type { Meta, StoryObj } from "@storybook/nextjs";

import { Caption, Grid, Stack, Title } from "@/shared/ui";
import { radiusTokens } from "@/styles/tokens";

const meta = {
  title: "Foundations/Radius",
  parameters: {
    docs: {
      description: {
        component: "Radius tokens keep surfaces calm, modern, and consistent."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Radius scale</Title>
      <Grid columns={3} gap={16}>
        {Object.entries(radiusTokens).map(([name]) => (
          <Stack key={name} gap={12}>
            <div
              aria-hidden="true"
              className="h-80 border border-border bg-surface-raised"
              style={{ borderRadius: `var(--radius-${name})` }}
            />
            <Caption as="p" color="soft">
              --radius-{name}
            </Caption>
          </Stack>
        ))}
      </Grid>
    </Stack>
  )
};
