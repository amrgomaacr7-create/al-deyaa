import type { Meta, StoryObj } from "@storybook/nextjs";
import { Lock, Eye, EyeOff } from "lucide-react";

import { PasswordInput, Stack, Title, Body, Grid } from "@/shared/ui";

const meta = {
  title: "Components/PasswordInput",
  component: PasswordInput,
  args: {
    placeholder: "Enter password...",
    showToggleIcon: true,
    disabled: false,
    readOnly: false,
    loading: false
  },
  argTypes: {
    showToggleIcon: {
      control: "boolean"
    },
    disabled: {
      control: "boolean"
    },
    readOnly: {
      control: "boolean"
    },
    loading: {
      control: "boolean"
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "The PasswordInput component is a specialized text input that toggles between password and text visibility. It includes an eye icon button to show/hide the password and supports all standard input features."
      }
    }
  }
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <PasswordInput {...args} />
};

export const Default: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Default Password Input</Title>
      <PasswordInput placeholder="Enter your password" />
    </Stack>
  )
};

export const WithoutToggle: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Without Show/Hide Toggle</Title>
      <PasswordInput placeholder="Password (no toggle)" showToggleIcon={false} />
    </Stack>
  )
};

export const WithCustomIcons: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>With Custom Icons</Title>
      <PasswordInput
        hiddenIcon={<EyeOff className="size-20" />}
        placeholder="Password with custom icons"
        visibleIcon={<Eye className="size-20" />}
      />
    </Stack>
  )
};

export const States: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>States</Title>
      <Grid columns={2} gap={16}>
        <Stack gap={4}>
          <Body color="soft">Normal</Body>
          <PasswordInput placeholder="Enter password" />
        </Stack>

        <Stack gap={4}>
          <Body color="soft">With Value</Body>
          <PasswordInput placeholder="Enter password" value="mysecurepassword" readOnly />
        </Stack>

        <Stack gap={4}>
          <Body color="soft">Disabled</Body>
          <PasswordInput disabled placeholder="Cannot enter" value="disabled" />
        </Stack>

        <Stack gap={4}>
          <Body color="soft">Read-only</Body>
          <PasswordInput readOnly placeholder="Cannot edit" value="readonly" />
        </Stack>
      </Grid>
    </Stack>
  )
};

export const KeyboardShortcuts: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Keyboard Shortcuts</Title>
      <Body color="soft">Press Ctrl+Enter (or Cmd+Enter on Mac) to toggle visibility</Body>
      <PasswordInput placeholder="Try Ctrl+Enter to toggle password visibility" />
    </Stack>
  )
};

export const FormFieldExample: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Form Field Examples</Title>
      <Grid columns={2} gap={24}>
        <Stack gap={8}>
          <label className="text-small font-medium text-text">
            Password <span className="text-danger">*</span>
          </label>
          <PasswordInput placeholder="Create a strong password" />
          <div className="text-caption text-text-soft">
            Use uppercase, lowercase, numbers, and symbols
          </div>
        </Stack>

        <Stack gap={8}>
          <label className="text-small font-medium text-text">
            Confirm Password <span className="text-danger">*</span>
          </label>
          <PasswordInput placeholder="Repeat your password" />
          <div className="text-caption text-text-soft">Passwords must match</div>
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
          <label className="text-small font-medium text-text" htmlFor="password-field">
            Password <span className="text-danger">*</span>
          </label>
          <PasswordInput
            aria-describedby="password-hint"
            aria-label="Password field"
            aria-required={true}
            id="password-field"
            placeholder="Enter your password"
          />
          <div className="text-caption text-text-soft" id="password-hint">
            Click the eye icon or press Ctrl+Enter to show/hide password
          </div>
        </Stack>

        <Body color="soft" className="mt-8">
          The password input provides:
        </Body>
        <ul className="list-inside list-disc space-y-2 text-body text-text-soft">
          <li>Clear aria-label on toggle button</li>
          <li>Visual feedback on toggle state</li>
          <li>Keyboard accessible toggle (Ctrl+Enter)</li>
          <li>Proper type attribute switching</li>
          <li>Focus management after toggle</li>
        </ul>
      </Stack>
    </Stack>
  )
};

export const ComparisonModes: Story = {
  render: () => (
    <Grid columns={2} gap={24}>
      <div data-theme="light">
        <Stack className="rounded-large border border-border bg-background p-24 text-text" gap={16}>
          <Title>Light Mode</Title>
          <Stack gap={12}>
            <PasswordInput placeholder="Default" />
            <PasswordInput
              disabled
              placeholder="Disabled"
              value="password123"
            />
            <PasswordInput
              placeholder="With value"
              readOnly
              value="securepass"
            />
          </Stack>
        </Stack>
      </div>
      <div data-theme="dark">
        <Stack className="rounded-large border border-border bg-background p-24 text-text" gap={16}>
          <Title>Dark Mode</Title>
          <Stack gap={12}>
            <PasswordInput placeholder="Default" />
            <PasswordInput
              disabled
              placeholder="Disabled"
              value="password123"
            />
            <PasswordInput
              placeholder="With value"
              readOnly
              value="securepass"
            />
          </Stack>
        </Stack>
      </div>
    </Grid>
  )
};
