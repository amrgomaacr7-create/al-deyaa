import type { Meta, StoryObj } from "@storybook/nextjs";

import { Body, Caption, Grid, Stack, Title } from "@/shared/ui";
import { durationTokens, motionTokens } from "@/styles/tokens";

const meta = {
  title: "Foundations/Motion",
  parameters: {
    docs: {
      description: {
        component:
          "Motion is subtle, tokenized, and reduced-motion aware for long study sessions."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const MotionTokens: Story = {
  render: () => (
    <Stack gap={24}>
      <Stack gap={8}>
        <Title>Motion tokens</Title>
        <Body color="soft">Components should use these named durations and behaviors.</Body>
      </Stack>

      <Grid columns={3} gap={16}>
        {Object.entries(durationTokens).map(([name, value]) => (
          <Stack key={name} className="rounded-large border border-border bg-surface p-16" gap={8}>
            <Caption as="p">{name}</Caption>
            <Body color="soft">{value}</Body>
          </Stack>
        ))}
      </Grid>

      <Grid columns={4} gap={16}>
        {Object.keys(motionTokens).map((name) => (
          <Stack key={name} className="rounded-large border border-border bg-surface p-16" gap={8}>
            <Caption as="p">{name}</Caption>
            <div className="h-16 w-48 rounded-pill bg-primary transition-transform duration-normal ease-standard hover:translate-x-16 motion-reduce:transition-none motion-reduce:hover:translate-x-0" />
          </Stack>
        ))}
      </Grid>
    </Stack>
  )
};
