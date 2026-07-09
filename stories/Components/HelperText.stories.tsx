import type { Meta, StoryObj } from "@storybook/nextjs";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

import { HelperText, Stack, Title, Body, Grid, Inline } from "@/shared/ui";

const meta = {
  title: "Components/HelperText",
  component: HelperText,
  args: {
    children: "This is helper text"
  },
  parameters: {
    docs: {
      description: {
        component:
          "The HelperText component provides secondary text information for form fields, such as hints or guidelines."
      }
    }
  }
} satisfies Meta<typeof HelperText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <HelperText {...args} />
};

export const Default: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Default Helper Text</Title>
      <HelperText>This is helper text providing additional context</HelperText>
    </Stack>
  )
};

export const WithInput: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Helper Text with Input Fields</Title>
      <Grid columns={2} gap={24}>
        <Stack gap={8}>
          <label className="text-small font-medium text-text">Username</label>
          <input
            className="w-full border border-border rounded-medium px-12 py-8 text-body placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-focus-ring"
            placeholder="Enter username"
            type="text"
          />
          <HelperText>
            Must be between 3-20 characters. No special characters allowed.
          </HelperText>
        </Stack>

        <Stack gap={8}>
          <label className="text-small font-medium text-text">Email</label>
          <input
            className="w-full border border-border rounded-medium px-12 py-8 text-body placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-focus-ring"
            placeholder="your@email.com"
            type="email"
          />
          <HelperText>We'll never share your email with anyone else.</HelperText>
        </Stack>
      </Grid>
    </Stack>
  )
};

export const MultipleHints: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Multiple Hints</Title>
      <Stack gap={8}>
        <label className="text-small font-medium text-text">Password</label>
        <input
          className="w-full border border-border rounded-medium px-12 py-8 text-body placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-focus-ring"
          placeholder="Create a strong password"
          type="password"
        />
        <Stack gap={4}>
          <HelperText>Password must contain:</HelperText>
          <ul className="list-inside list-disc space-y-2">
            <li className="text-caption text-text-soft">At least 8 characters</li>
            <li className="text-caption text-text-soft">At least one uppercase letter</li>
            <li className="text-caption text-text-soft">At least one number</li>
            <li className="text-caption text-text-soft">At least one special character</li>
          </ul>
        </Stack>
      </Stack>
    </Stack>
  )
};

export const Examples: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Helper Text Examples</Title>
      <Grid columns={2} gap={24}>
        <Stack gap={8}>
          <Inline gap={8} align="center">
            <Info className="size-16 text-info" />
            <HelperText>This is informational helper text</HelperText>
          </Inline>
        </Stack>

        <Stack gap={8}>
          <Inline gap={8} align="center">
            <CheckCircle className="size-16 text-success" />
            <HelperText>This field is correctly filled</HelperText>
          </Inline>
        </Stack>
      </Grid>
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
            <HelperText>This is helper text in light mode</HelperText>
            <HelperText>Provides context and guidance to users</HelperText>
          </Stack>
        </Stack>
      </div>
      <div data-theme="dark">
        <Stack className="rounded-large border border-border bg-background p-24 text-text" gap={16}>
          <Title>Dark Mode</Title>
          <Stack gap={12}>
            <HelperText>This is helper text in dark mode</HelperText>
            <HelperText>Provides context and guidance to users</HelperText>
          </Stack>
        </Stack>
      </div>
    </Grid>
  )
};
