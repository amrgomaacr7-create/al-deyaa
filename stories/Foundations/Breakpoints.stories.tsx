import type { Meta, StoryObj } from "@storybook/nextjs";

import { Caption, Inline, Stack, Title } from "@/shared/ui";
import { breakpointTokens } from "@/styles/tokens";

const meta = {
  title: "Foundations/Breakpoints",
  parameters: {
    docs: {
      description: {
        component: "Responsive breakpoints align product previews with the Al-Deyaa layout system."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Breakpoints</Title>
      <Stack gap={16}>
        {Object.entries(breakpointTokens).map(([name, value]) => (
          <Inline key={name} className="rounded-large border border-border bg-surface p-16" justify="between">
            <Caption as="p">{name}</Caption>
            <Caption as="p" color="soft">
              {value}
            </Caption>
          </Inline>
        ))}
      </Stack>
    </Stack>
  )
};
