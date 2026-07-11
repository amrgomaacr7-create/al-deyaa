import type { Meta, StoryObj } from "@storybook/nextjs";
import { Body, Divider, Grid, HorizontalDivider, Separator, Stack, Title, VerticalDivider } from "@/shared/ui";

const meta = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    docs: {
      description: {
        component:
          "Token-driven divider primitives for clear visual separation. Includes horizontal, vertical, and semantic separator variants for accessible layouts."
      }
    }
  }
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Divider</Title>
      <Body>
        Use the Divider component to separate content sections with a thin token-driven line.
      </Body>
      <Stack gap={16}>
        <Body>Section A</Body>
        <Divider />
        <Body>Section B</Body>
      </Stack>
    </Stack>
  )
};

export const SeparatorExample: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Separator</Title>
      <Body>The Separator renders an <code>hr</code> element for semantic section breaks.</Body>
      <Stack gap={16}>
        <Body>Beginning</Body>
        <Separator />
        <Body>End</Body>
      </Stack>
    </Stack>
  )
};

export const OrientationExample: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Horizontal and vertical dividers</Title>
      <Grid columns={2} gap={24}>
        <Stack gap={16}>
          <Body>Horizontal divider</Body>
          <Divider />
        </Stack>
        <Stack gap={16}>
          <Body>Vertical divider</Body>
          <div className="flex items-center gap-16">
            <Body>Left</Body>
            <VerticalDivider />
            <Body>Right</Body>
          </div>
        </Stack>
      </Grid>
      <Stack gap={16}>
        <Body>Horizontal divider with explicit component</Body>
        <HorizontalDivider />
      </Stack>
    </Stack>
  )
};
