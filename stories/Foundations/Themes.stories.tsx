import type { Meta, StoryObj } from "@storybook/nextjs";

import { Body, Grid, Stack, Title } from "@/shared/ui";

const meta = {
  title: "Foundations/Themes",
  parameters: {
    docs: {
      description: {
        component:
          "Light, dark, and system themes use the same semantic token names and shared design language."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeSurfaces: Story = {
  render: () => (
    <Stack gap={24}>
      <Stack gap={8}>
        <Title>Theme surfaces</Title>
        <Body color="soft">Use the toolbar theme control to switch between light, dark, and system.</Body>
      </Stack>

      <Grid columns={3} gap={16}>
        <Stack className="rounded-large border border-border bg-background p-24" gap={8}>
          <Title as="h3">Background</Title>
          <Body color="soft">Page-level foundation.</Body>
        </Stack>
        <Stack className="rounded-large border border-border bg-surface p-24" gap={8}>
          <Title as="h3">Surface</Title>
          <Body color="soft">Controls and quiet panels.</Body>
        </Stack>
        <Stack className="rounded-large border border-border bg-card p-24 shadow-soft" gap={8}>
          <Title as="h3">Card</Title>
          <Body color="soft">Contained repeated information.</Body>
        </Stack>
      </Grid>
    </Stack>
  )
};
