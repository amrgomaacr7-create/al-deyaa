import type { Meta, StoryObj } from "@storybook/nextjs";

import { Body, Caption, Code, Display, Heading, Small, Stack, Subtitle, Title } from "@/shared/ui";

const meta = {
  title: "Foundations/Typography",
  parameters: {
    docs: {
      description: {
        component:
          "Typography primitives consume token-backed font sizes, line heights, weights, and colors."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <Stack gap={24}>
      <Display>Display: Knowledge with calm focus</Display>
      <Heading level={1}>Heading 1: Long study sessions need clarity</Heading>
      <Heading level={2}>Heading 2: Lessons, progress, and guidance</Heading>
      <Heading level={3}>Heading 3: Comfortable educational rhythm</Heading>
      <Title>Title: Reusable section title</Title>
      <Subtitle>Subtitle: Gentle supporting text for context.</Subtitle>
      <Body>Body: The default reading style is tuned for readability and reduced fatigue.</Body>
      <Small>Small: Secondary instructional text.</Small>
      <Caption>Caption: Metadata, helper labels, and compact notes.</Caption>
      <Code>Code: token-driven monospace text</Code>
    </Stack>
  )
};
