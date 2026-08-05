import type { Meta, StoryObj } from "@storybook/nextjs";
import { AlertCircle, XCircle } from "lucide-react";

import { ErrorText, Stack, Title, Body, Grid, Inline } from "@/shared/ui";

const meta = {
  title: "Components/ErrorText",
  component: ErrorText,
  args: {
    children: "This is error text"
  },
  parameters: {
    docs: {
      description: {
        component:
          "The ErrorText component displays validation error messages for form fields with an accessible alert role and live region support."
      }
    }
  }
} satisfies Meta<typeof ErrorText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <ErrorText {...args} />
};

export const Default: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Default Error Text</Title>
      <ErrorText>This field is required</ErrorText>
    </Stack>
  )
};

export const WithInput: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Error Text with Input Fields</Title>
      <Grid columns={2} gap={24}>
        <Stack gap={8}>
          <label className="text-small font-medium text-text" htmlFor="email-error">
            Email Address <span className="text-danger">*</span>
          </label>
          <input
            aria-invalid="true"
            className="w-full border border-danger rounded-medium bg-danger/5 px-12 py-8 text-body placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-danger"
            id="email-error"
            placeholder="your@email.com"
            type="email"
            value="invalid.email"
          />
          <ErrorText>Please enter a valid email address</ErrorText>
        </Stack>

        <Stack gap={8}>
          <label className="text-small font-medium text-text" htmlFor="password-error">
            Password <span className="text-danger">*</span>
          </label>
          <input
            aria-invalid="true"
            className="w-full border border-danger rounded-medium bg-danger/5 px-12 py-8 text-body placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-danger"
            id="password-error"
            placeholder="••••••••"
            type="password"
          />
          <ErrorText>Password must be at least 8 characters</ErrorText>
        </Stack>
      </Grid>
    </Stack>
  )
};

export const ValidationErrors: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Common Validation Errors</Title>
      <Grid columns={2} gap={24}>
        <Stack gap={8}>
          <label className="text-small font-medium text-text">Username</label>
          <input
            aria-invalid="true"
            className="w-full border border-danger rounded-medium bg-danger/5 px-12 py-8 text-body placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-danger"
            placeholder="Enter username"
            type="text"
          />
          <ErrorText>Username is already taken</ErrorText>
        </Stack>

        <Stack gap={8}>
          <label className="text-small font-medium text-text">Age</label>
          <input
            aria-invalid="true"
            className="w-full border border-danger rounded-medium bg-danger/5 px-12 py-8 text-body placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-danger"
            placeholder="Enter your age"
            type="number"
          />
          <ErrorText>You must be at least 18 years old</ErrorText>
        </Stack>
      </Grid>
    </Stack>
  )
};

export const MultipleErrors: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Multiple Errors</Title>
      <Stack gap={8}>
        <label className="text-small font-medium text-text">Password</label>
        <input
          aria-invalid="true"
          className="w-full border border-danger rounded-medium bg-danger/5 px-12 py-8 text-body placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-danger"
          placeholder="Create a strong password"
          type="password"
          value="123"
        />
        <Stack gap={4} role="alert">
          <ErrorText>Password has the following issues:</ErrorText>
          <ul className="list-inside list-disc space-y-2">
            <li className="text-caption text-danger">Too short (minimum 8 characters)</li>
            <li className="text-caption text-danger">Missing uppercase letters</li>
            <li className="text-caption text-danger">Missing special characters</li>
          </ul>
        </Stack>
      </Stack>
    </Stack>
  )
};

export const WithIcons: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Error Text with Icons</Title>
      <Stack gap={16}>
        <Inline gap={8} align="center">
          <AlertCircle className="size-16 text-danger" />
          <ErrorText>This is a general error message</ErrorText>
        </Inline>

        <Inline gap={8} align="center">
          <XCircle className="size-16 text-danger" />
          <ErrorText>Operation failed. Please try again.</ErrorText>
        </Inline>
      </Stack>
    </Stack>
  )
};

export const AccessibilityDemo: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Accessibility</Title>
      <Body color="soft">
        Error messages are presented with proper ARIA roles and live regions for screen reader announcement.
      </Body>
      <Stack gap={12}>
        <Stack gap={4}>
          <label className="text-small font-medium text-text" htmlFor="username-field">
            Username <span className="text-danger">*</span>
          </label>
          <input
            aria-describedby="username-error"
            aria-invalid="true"
            aria-label="Username field"
            aria-required={true}
            className="w-full border border-danger rounded-medium bg-danger/5 px-12 py-8 text-body placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-danger"
            id="username-field"
            placeholder="Enter username"
            type="text"
          />
          <div aria-live="polite" id="username-error" role="alert">
            <ErrorText>Username is required and must be unique</ErrorText>
          </div>
        </Stack>

        <Body color="soft" className="mt-8">
          Screen readers will:
        </Body>
        <ul className="list-inside list-disc space-y-2 text-body text-text-soft">
          <li>Announce the field as invalid via aria-invalid</li>
          <li>Associate the error text via aria-describedby</li>
          <li>Announce error messages in live regions</li>
          <li>Announce the field has an alert role</li>
        </ul>
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
            <ErrorText>This is an error message in light mode</ErrorText>
            <ErrorText>Field validation failed</ErrorText>
            <ErrorText>Please correct the following errors</ErrorText>
          </Stack>
        </Stack>
      </div>
      <div data-theme="dark">
        <Stack className="rounded-large border border-border bg-background p-24 text-text" gap={16}>
          <Title>Dark Mode</Title>
          <Stack gap={12}>
            <ErrorText>This is an error message in dark mode</ErrorText>
            <ErrorText>Field validation failed</ErrorText>
            <ErrorText>Please correct the following errors</ErrorText>
          </Stack>
        </Stack>
      </div>
    </Grid>
  )
};
