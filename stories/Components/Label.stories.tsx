import type { Meta, StoryObj } from "@storybook/nextjs";

import { Label, Stack, Title, Body, Grid } from "@/shared/ui";

const meta = {
  title: "Components/Label",
  component: Label,
  args: {
    children: "Label text",
    required: false,
    disabled: false
  },
  argTypes: {
    required: {
      control: "boolean"
    },
    disabled: {
      control: "boolean"
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "The Label component provides semantic, accessible labels for form inputs with support for required indicators and disabled states."
      }
    }
  }
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <Label {...args} />
};

export const Default: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Default Label</Title>
      <Label>Email Address</Label>
    </Stack>
  )
};

export const Required: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Required Label</Title>
      <Label required>Password</Label>
    </Stack>
  )
};

export const Disabled: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Disabled Label</Title>
      <Label disabled>Disabled Field</Label>
    </Stack>
  )
};

export const States: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Label States</Title>
      <Grid columns={2} gap={16}>
        <Stack gap={8}>
          <Body color="soft">Default</Body>
          <Label>Normal Label</Label>
        </Stack>

        <Stack gap={8}>
          <Body color="soft">Required</Body>
          <Label required>Required Label</Label>
        </Stack>

        <Stack gap={8}>
          <Body color="soft">Disabled</Body>
          <Label disabled>Disabled Label</Label>
        </Stack>

        <Stack gap={8}>
          <Body color="soft">Required & Disabled</Body>
          <Label disabled required>
            Disabled & Required
          </Label>
        </Stack>
      </Grid>
    </Stack>
  )
};

export const WithFormField: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Label with Form Fields</Title>
      <Grid columns={2} gap={24}>
        <Stack gap={8}>
          <Label required>Email Address</Label>
          <input
            className="w-full border border-border rounded-medium px-12 py-8 text-body placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-focus-ring"
            placeholder="your@email.com"
            type="email"
          />
        </Stack>

        <Stack gap={8}>
          <Label required>Password</Label>
          <input
            className="w-full border border-border rounded-medium px-12 py-8 text-body placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-focus-ring"
            placeholder="••••••••"
            type="password"
          />
        </Stack>
      </Grid>
    </Stack>
  )
};

export const AccessibilityDemo: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Accessibility</Title>
      <Stack gap={12}>
        <Stack gap={4}>
          <Label required>Username</Label>
          <input
            aria-describedby="username-hint"
            aria-label="Username field"
            aria-required={true}
            className="w-full border border-border rounded-medium px-12 py-8 text-body placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-focus-ring"
            id="username-field"
            placeholder="Enter username"
            type="text"
          />
          <div className="text-caption text-text-soft" id="username-hint">
            Must be between 3-20 characters
          </div>
        </Stack>
      </Stack>
    </Stack>
  )
};

export const VariantComparison: Story = {
  render: () => (
    <Grid columns={2} gap={24}>
      <div data-theme="light">
        <Stack className="rounded-large border border-border bg-background p-24 text-text" gap={16}>
          <Title>Light Mode</Title>
          <Stack gap={12}>
            <Label>Default Label</Label>
            <Label required>Required Label</Label>
            <Label disabled>Disabled Label</Label>
          </Stack>
        </Stack>
      </div>
      <div data-theme="dark">
        <Stack className="rounded-large border border-border bg-background p-24 text-text" gap={16}>
          <Title>Dark Mode</Title>
          <Stack gap={12}>
            <Label>Default Label</Label>
            <Label required>Required Label</Label>
            <Label disabled>Disabled Label</Label>
          </Stack>
        </Stack>
      </div>
    </Grid>
  )
};
