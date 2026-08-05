import type { Meta, StoryObj } from "@storybook/nextjs";
import { Mail, AlertCircle, Search, Eye } from "lucide-react";

import { Input, Stack, Title, Body, Grid } from "@/shared/ui";
import type { InputProps } from "@/shared/ui";

const variants = ["solid", "soft", "outline", "ghost"] as const satisfies NonNullable<
  InputProps["variant"]
>[];

const sizes = ["xs", "sm", "md", "lg", "xl"] as const satisfies NonNullable<
  InputProps["size"]
>[];

const states = ["default", "success", "warning", "error"] as const satisfies NonNullable<
  InputProps["state"]
>[];

const meta = {
  title: "Components/Input",
  component: Input,
  args: {
    placeholder: "Enter text...",
    variant: "outline",
    size: "md",
    state: "default",
    disabled: false,
    readonly: false,
    loading: false,
    clearable: false,
    showCounter: false
  },
  argTypes: {
    variant: {
      control: "select",
      options: variants
    },
    size: {
      control: "select",
      options: sizes
    },
    state: {
      control: "select",
      options: states
    },
    disabled: {
      control: "boolean"
    },
    readonly: {
      control: "boolean"
    },
    loading: {
      control: "boolean"
    },
    clearable: {
      control: "boolean"
    },
    showCounter: {
      control: "boolean"
    },
    maxLength: {
      control: "number"
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "The Input component is a flexible, accessible text input field supporting multiple variants, sizes, and states. It includes icon support, character counter, clear button, and loading states."
      }
    }
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <Input {...args} />
};

export const Variants: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Variants</Title>
      <Grid columns={2} gap={16}>
        {variants.map((variant) => (
          <Input key={variant} placeholder={variant} variant={variant} />
        ))}
      </Grid>
    </Stack>
  )
};

export const Sizes: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Sizes</Title>
      <Stack gap={12}>
        {sizes.map((size) => (
          <Input key={size} placeholder={size} size={size} />
        ))}
      </Stack>
    </Stack>
  )
};

export const States: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>States</Title>
      <Grid columns={2} gap={16}>
        <Input placeholder="Default" state="default" />
        <Input placeholder="Success" state="success" />
        <Input placeholder="Warning" state="warning" />
        <Input placeholder="Error" state="error" />
      </Grid>
    </Stack>
  )
};

export const Disabled: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Disabled</Title>
      <Grid columns={2} gap={16}>
        <Input disabled placeholder="Disabled input" value="Cannot edit" />
        <Input
          disabled
          placeholder="Disabled with value"
          readonly
          value="Read-only"
        />
      </Grid>
    </Stack>
  )
};

export const Readonly: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Read-only</Title>
      <Grid columns={2} gap={16}>
        <Input placeholder="Read-only" readonly value="Cannot modify" />
        <Input
          placeholder="Read-only focused"
          readonly
          value="Tab to me"
        />
      </Grid>
    </Stack>
  )
};

export const Loading: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Loading</Title>
      <Grid columns={2} gap={16}>
        <Input loading placeholder="Loading input" value="Validating..." />
        <Input loading placeholder="Loading read-only" readonly value="Processing..." />
      </Grid>
    </Stack>
  )
};

export const WithIcons: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>With Icons</Title>
      <Stack gap={12}>
        <Input leftIcon={<Mail />} placeholder="Left icon" />
        <Input placeholder="Right icon" rightIcon={<AlertCircle />} />
        <Input leftIcon={<Search />} placeholder="Both icons" rightIcon={<Eye />} />
      </Stack>
    </Stack>
  )
};

export const Clearable: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Clearable</Title>
      <Grid columns={2} gap={16}>
        <Input
          clearable
          defaultValue="Click the X to clear"
          placeholder="Clearable input"
          onClear={() => console.log("Cleared!")}
        />
        <Input
          clearable
          leftIcon={<Search />}
          placeholder="Clearable with icon"
        />
      </Grid>
    </Stack>
  )
};

export const CharacterCounter: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Character Counter</Title>
      <Stack gap={12}>
        <Input
          maxLength={50}
          placeholder="Max 50 characters"
          showCounter={true}
        />
        <Input
          maxLength={100}
          placeholder="Max 100 characters"
          showCounter={true}
        />
      </Stack>
    </Stack>
  )
};

export const AllStates: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>All States</Title>
      <Grid columns={4} gap={16}>
        <Input placeholder="Normal" />
        <Input disabled placeholder="Disabled" />
        <Input loading placeholder="Loading" />
        <Input autoFocus placeholder="Keyboard focus" />
      </Grid>
      <Body color="soft">
        Use keyboard navigation in the canvas to verify focus visibility and activation behavior.
      </Body>
    </Stack>
  )
};

export const FormFieldExample: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Form Field Example</Title>
      <Grid columns={2} gap={24}>
        <Stack gap={8}>
          <label className="text-small font-medium text-text">Email Address</label>
          <Input
            leftIcon={<Mail />}
            placeholder="your@email.com"
            type="email"
          />
          <div className="text-caption text-text-soft">Enter your registered email address</div>
        </Stack>

        <Stack gap={8}>
          <label className="text-small font-medium text-text">
            Message <span className="text-danger">*</span>
          </label>
          <Input
            maxLength={200}
            placeholder="Your message (required)"
            showCounter={true}
            state="default"
          />
          <div className="text-caption text-text-soft">Maximum 200 characters</div>
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
          <label className="text-small font-medium text-text" htmlFor="accessible-input">
            Username <span className="text-danger">*</span>
          </label>
          <Input
            aria-describedby="username-hint"
            aria-label="Username field"
            aria-required={true}
            id="accessible-input"
            placeholder="Enter username"
          />
          <div className="text-caption text-text-soft" id="username-hint">
            Must be between 3-20 characters
          </div>
        </Stack>

        <Stack gap={4}>
          <label className="text-small font-medium text-text" htmlFor="invalid-input">
            Password <span className="text-danger">*</span>
          </label>
          <Input
            aria-describedby="password-error"
            aria-invalid={true}
            aria-label="Password field"
            aria-required={true}
            id="invalid-input"
            placeholder="Enter password"
            state="error"
          />
          <div aria-live="polite" className="text-caption text-danger" id="password-error" role="alert">
            Password must be at least 8 characters
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
          {variants.map((variant) => (
            <Input key={variant} placeholder={variant} variant={variant} />
          ))}
        </Stack>
      </div>
      <div data-theme="dark">
        <Stack className="rounded-large border border-border bg-background p-24 text-text" gap={16}>
          <Title>Dark Mode</Title>
          {variants.map((variant) => (
            <Input key={variant} placeholder={variant} variant={variant} />
          ))}
        </Stack>
      </div>
    </Grid>
  )
};
