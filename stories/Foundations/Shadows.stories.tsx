import type { Meta, StoryObj } from "@storybook/nextjs";

import { Caption, Grid, Stack, Title } from "@/shared/ui";
import { shadowTokens } from "@/styles/tokens";

const meta = {
  title: "Foundations/Shadows",
  parameters: {
    docs: {
      description: {
        component: "Shadow tokens provide restrained elevation without dashboard-like visual noise."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Shadow scale</Title>
      <Grid columns={3} gap={24}>
        {Object.keys(shadowTokens).map((name) => (
          <Stack
            key={name}
            className="rounded-large border border-border bg-surface-raised p-24"
            gap={12}
            style={{ boxShadow: `var(--shadow-${name})` }}
          >
            <Caption as="p" color="soft">
              --shadow-{name}
            </Caption>
          </Stack>
        ))}
      </Grid>
    </Stack>
  )
};
