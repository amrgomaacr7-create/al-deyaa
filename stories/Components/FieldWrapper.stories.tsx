import type { Meta, StoryObj } from "@storybook/nextjs";
import { Mail, Lock, AlertCircle } from "lucide-react";

import { FieldWrapper, Input, Textarea, Stack, Title, Body, Grid } from "@/shared/ui";

const meta = {
  title: "Components/FieldWrapper",
  component: FieldWrapper,
  parameters: {
    docs: {
      description: {
        component:
          "The FieldWrapper component is a container that combines label, input field, and helper/error text together. It provides proper spacing and accessibility features."
      }
    }
  },
  args: {
    children: undefined
  }
} as Meta<typeof FieldWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <FieldWrapper label="Field Label">
      <Input placeholder="Enter text..." />
    </FieldWrapper>
  )
} as Story;

export const Default: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Default Field Wrapper</Title>
      <FieldWrapper label="Email Address">
        <Input placeholder="your@email.com" type="email" />
      </FieldWrapper>
    </Stack>
  )
} as Story;

export const WithHelper: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>With Helper Text</Title>
      <FieldWrapper
        helperText="We'll never share your email with anyone else"
        label="Email Address"
      >
        <Input placeholder="your@email.com" type="email" />
      </FieldWrapper>
    </Stack>
  )
} as Story;

export const WithError: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>With Error Text</Title>
      <FieldWrapper
        errorText="Please enter a valid email address"
        label="Email Address"
        state="error"
      >
        <Input placeholder="your@email.com" state="error" type="email" value="invalid" />
      </FieldWrapper>
    </Stack>
  )
} as Story;

export const States: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Field States</Title>
      <Grid columns={2} gap={24}>
        <FieldWrapper helperText="This is helper text" label="Default State">
          <Input placeholder="Default state" />
        </FieldWrapper>

        <FieldWrapper
          helperText="Successfully validated"
          label="Success State"
          state="success"
        >
          <Input placeholder="Success state" state="success" value="correct@email.com" />
        </FieldWrapper>

        <FieldWrapper
          helperText="Warning: This field may need review"
          label="Warning State"
          state="warning"
        >
          <Input placeholder="Warning state" state="warning" />
        </FieldWrapper>

        <FieldWrapper
          errorText="This field is required"
          label="Error State"
          state="error"
        >
          <Input placeholder="Error state" state="error" />
        </FieldWrapper>
      </Grid>
    </Stack>
  )
} as Story;

export const Required: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Required Field</Title>
      <FieldWrapper
        helperText="Enter at least 8 characters"
        label="Password"
        required
      >
        <Input placeholder="••••••••" type="password" />
      </FieldWrapper>
    </Stack>
  )
} as Story;

export const Disabled: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Disabled Field</Title>
      <FieldWrapper
        disabled
        label="Disabled Field"
      >
        <Input disabled placeholder="Cannot edit" value="Disabled value" />
      </FieldWrapper>
    </Stack>
  )
} as Story;

export const Spacing: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Spacing Options</Title>
      <Grid columns={3} gap={24}>
        <Stack gap={12}>
          <Body color="soft">Compact</Body>
          <FieldWrapper
            helperText="Compact spacing"
            label="Compact"
            spacing="compact"
          >
            <Input placeholder="Compact spacing" />
          </FieldWrapper>
        </Stack>

        <Stack gap={12}>
          <Body color="soft">Normal</Body>
          <FieldWrapper
            helperText="Normal spacing"
            label="Normal"
            spacing="normal"
          >
            <Input placeholder="Normal spacing" />
          </FieldWrapper>
        </Stack>

        <Stack gap={12}>
          <Body color="soft">Comfortable</Body>
          <FieldWrapper
            helperText="Comfortable spacing"
            label="Comfortable"
            spacing="comfortable"
          >
            <Input placeholder="Comfortable spacing" />
          </FieldWrapper>
        </Stack>
      </Grid>
    </Stack>
  )
} as Story;

export const FormFields: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Complete Form Fields</Title>
      <Grid columns={2} gap={24}>
        <FieldWrapper
          helperText="Enter your email address"
          label="Email Address"
          required
        >
          <Input
            leftIcon={<Mail className="size-16" />}
            placeholder="your@email.com"
            type="email"
          />
        </FieldWrapper>

        <FieldWrapper
          helperText="Create a strong password (min. 8 characters)"
          label="Password"
          required
        >
          <Input
            leftIcon={<Lock className="size-16" />}
            placeholder="••••••••"
            type="password"
          />
        </FieldWrapper>

        <FieldWrapper
          helperText="Tell us about yourself"
          label="Biography"
          spacing="comfortable"
        >
          <Textarea maxLength={200} placeholder="Your story..." showCounter />
        </FieldWrapper>

        <FieldWrapper
          errorText="This username is already taken"
          label="Username"
          required
          state="error"
        >
          <Input placeholder="Choose a username" state="error" />
        </FieldWrapper>
      </Grid>
    </Stack>
  )
} as Story;

export const WithTextarea: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>With Textarea</Title>
      <Grid columns={2} gap={24}>
        <FieldWrapper
          helperText="Share your feedback"
          label="Feedback"
          required
        >
          <Textarea maxLength={200} placeholder="Your feedback..." showCounter />
        </FieldWrapper>

        <FieldWrapper
          errorText="Please describe the issue in more detail"
          label="Problem Description"
          required
          state="error"
        >
          <Textarea
            maxLength={500}
            placeholder="Describe the problem..."
            showCounter
            state="error"
          />
        </FieldWrapper>
      </Grid>
    </Stack>
  )
} as Story;

export const AccessibilityDemo: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Accessibility</Title>
      <Stack gap={12}>
        <FieldWrapper
          errorText="Please enter a valid email address"
          helperText="We'll send you a confirmation email"
          label="Email Address"
          required
          state="error"
        >
          <Input
            aria-describedby="email-helper"
            aria-label="Email address field"
            aria-required={true}
            aria-invalid={true}
            id="email-field"
            placeholder="your@email.com"
            state="error"
            type="email"
          />
        </FieldWrapper>

        <Body color="soft" className="mt-8">
          The FieldWrapper provides:
        </Body>
        <ul className="list-inside list-disc space-y-2 text-body text-text-soft">
          <li>Semantic label association</li>
          <li>Proper error message presentation with role="alert"</li>
          <li>Helper text for additional context</li>
          <li>Support for required field indicators</li>
          <li>Consistent spacing and visual hierarchy</li>
          <li>Full keyboard navigation support</li>
        </ul>
      </Stack>
    </Stack>
  )
} as Story;

export const VariantComparison: Story = {
  render: () => (
    <Grid columns={2} gap={24}>
      <div data-theme="light">
        <Stack className="rounded-large border border-border bg-background p-24 text-text" gap={16}>
          <Title>Light Mode</Title>
          <Stack gap={16}>
            <FieldWrapper
              helperText="Helper text"
              label="Default"
            >
              <Input placeholder="Input field" />
            </FieldWrapper>

            <FieldWrapper
              errorText="Error message"
              label="Error"
              state="error"
            >
              <Input placeholder="Input field" state="error" />
            </FieldWrapper>
          </Stack>
        </Stack>
      </div>
      <div data-theme="dark">
        <Stack className="rounded-large border border-border bg-background p-24 text-text" gap={16}>
          <Title>Dark Mode</Title>
          <Stack gap={16}>
            <FieldWrapper
              helperText="Helper text"
              label="Default"
            >
              <Input placeholder="Input field" />
            </FieldWrapper>

            <FieldWrapper
              errorText="Error message"
              label="Error"
              state="error"
            >
              <Input placeholder="Input field" state="error" />
            </FieldWrapper>
          </Stack>
        </Stack>
      </div>
    </Grid>
  )
} as Story;
