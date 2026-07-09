import type { Meta, StoryObj } from "@storybook/nextjs";

import { Caption, Inline, Stack, Title } from "@/shared/ui";
import { spacingTokens } from "@/styles/tokens";

const meta = {
  title: "Foundations/Spacing",
  parameters: {
    docs: {
      description: {
        component: "The spacing scale defines layout rhythm for every Al-Deyaa component."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Spacing scale</Title>
      <Stack gap={16}>
        {Object.entries(spacingTokens).map(([name, value]) => (
          <Inline key={name} gap={16} align="center" wrap={false}>
            <Caption className="w-48" as="p">
              {name}
            </Caption>
            <div
              aria-hidden="true"
              className="h-16 rounded-small bg-primary"
              style={{ width: `var(--space-${name})` }}
            />
            <Caption as="p" color="soft">
              {value}
            </Caption>
          </Inline>
        ))}
      </Stack>
    </Stack>
  )
};
