import type { Meta, StoryObj } from "@storybook/nextjs";

import { Textarea, Stack, Title, Body, Grid } from "@/shared/ui";
import type { TextareaProps } from "@/shared/ui";

const variants = ["solid", "soft", "outline", "ghost"] as const satisfies NonNullable<
  TextareaProps["variant"]
>[];

const sizes = ["sm", "md", "lg", "xl"] as const satisfies NonNullable<
  TextareaProps["size"]
>[];

const states = ["default", "success", "warning", "error"] as const satisfies NonNullable<
  TextareaProps["state"]
>[];

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  args: {
    placeholder: "Enter your message...",
    variant: "outline",
    size: "md",
    state: "default",
    disabled: false,
    readonly: false,
    loading: false,
    showCounter: false,
    resizable: "vertical"
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
    showCounter: {
      control: "boolean"
    },
    resizable: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"]
    },
    maxLength: {
      control: "number"
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "The Textarea component is a multi-line text input field supporting multiple variants, sizes, states, and optional character counting. It respects user preferences for reduced motion and provides full accessibility support."
      }
    }
  }
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <Textarea {...args} />
};

export const Variants: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Variants</Title>
      <Grid columns={2} gap={16}>
        {variants.map((variant) => (
          <Textarea key={variant} placeholder={variant} variant={variant} />
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
          <Textarea key={size} placeholder={`Size: ${size}`} size={size} />
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
        <Textarea placeholder="Default state" state="default" />
        <Textarea placeholder="Success state" state="success" />
        <Textarea placeholder="Warning state" state="warning" />
        <Textarea placeholder="Error state" state="error" />
      </Grid>
    </Stack>
  )
};

export const Disabled: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Disabled</Title>
      <Textarea
        disabled
        placeholder="This textarea is disabled"
        value="You cannot edit this content"
      />
    </Stack>
  )
};

export const Readonly: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Read-only</Title>
      <Textarea
        placeholder="This textarea is read-only"
        readonly
        value="You can select but not modify this content"
      />
    </Stack>
  )
};

export const Loading: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Loading</Title>
      <Textarea
        loading
        placeholder="Processing your input..."
        value="Validating content..."
      />
    </Stack>
  )
};

export const CharacterCounter: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Character Counter</Title>
      <Stack gap={12}>
        <Stack gap={8}>
          <Body color="soft">Short message (100 characters)</Body>
          <Textarea
            maxLength={100}
            placeholder="Max 100 characters"
            showCounter={true}
          />
        </Stack>

        <Stack gap={8}>
          <Body color="soft">Long message (500 characters)</Body>
          <Textarea
            maxLength={500}
            placeholder="Max 500 characters"
            showCounter={true}
          />
        </Stack>
      </Stack>
    </Stack>
  )
};

export const Resizable: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Resizable Options</Title>
      <Stack gap={12}>
        <Stack gap={4}>
          <Body color="soft">None (fixed size)</Body>
          <Textarea placeholder="Cannot resize" resizable="none" />
        </Stack>

        <Stack gap={4}>
          <Body color="soft">Vertical (default)</Body>
          <Textarea placeholder="Drag to resize vertically" resizable="vertical" />
        </Stack>

        <Stack gap={4}>
          <Body color="soft">Horizontal</Body>
          <Textarea placeholder="Drag to resize horizontally" resizable="horizontal" />
        </Stack>

        <Stack gap={4}>
          <Body color="soft">Both</Body>
          <Textarea placeholder="Drag to resize in any direction" resizable="both" />
        </Stack>
      </Stack>
    </Stack>
  )
};

export const FormFieldExample: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Form Field Example</Title>
      <Grid columns={2} gap={24}>
        <Stack gap={8}>
          <label className="text-small font-medium text-text">
            Feedback <span className="text-danger">*</span>
          </label>
          <Textarea
            maxLength={200}
            placeholder="Tell us what you think..."
            showCounter={true}
          />
          <div className="text-caption text-text-soft">
            Share your thoughts (required, max 200 characters)
          </div>
        </Stack>

        <Stack gap={8}>
          <label className="text-small font-medium text-text">Description</label>
          <Textarea
            maxLength={500}
            placeholder="Detailed description..."
            showCounter={true}
          />
          <div className="text-caption text-text-soft">Optional, max 500 characters</div>
        </Stack>
      </Grid>
    </Stack>
  )
};

export const AllStates: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>All States</Title>
      <Grid columns={2} gap={16}>
        <Textarea placeholder="Normal textarea" />
        <Textarea disabled placeholder="Disabled textarea" value="Cannot edit" />
        <Textarea readonly placeholder="Read-only textarea" value="Cannot modify" />
        <Textarea loading placeholder="Loading textarea" value="Processing..." />
      </Grid>
      <Body color="soft">
        Demonstrating different states and their visual representations.
      </Body>
    </Stack>
  )
};

export const AccessibilityDemo: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Accessibility</Title>
      <Stack gap={12}>
        <Stack gap={4}>
          <label className="text-small font-medium text-text" htmlFor="feedback-textarea">
            Feedback <span className="text-danger">*</span>
          </label>
          <Textarea
            aria-describedby="feedback-hint"
            aria-label="Feedback textarea"
            aria-required={true}
            id="feedback-textarea"
            placeholder="Share your feedback"
          />
          <div className="text-caption text-text-soft" id="feedback-hint">
            Please provide constructive feedback to help us improve
          </div>
        </Stack>

        <Stack gap={4}>
          <label className="text-small font-medium text-text" htmlFor="error-textarea">
            Error Example <span className="text-danger">*</span>
          </label>
          <Textarea
            aria-describedby="error-message"
            aria-invalid={true}
            aria-label="Error example textarea"
            aria-required={true}
            id="error-textarea"
            placeholder="This field has an error"
            state="error"
          />
          <div aria-live="polite" className="text-caption text-danger" id="error-message" role="alert">
            Please enter at least 10 characters
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
            <Textarea key={variant} placeholder={variant} variant={variant} />
          ))}
        </Stack>
      </div>
      <div data-theme="dark">
        <Stack className="rounded-large border border-border bg-background p-24 text-text" gap={16}>
          <Title>Dark Mode</Title>
          {variants.map((variant) => (
            <Textarea key={variant} placeholder={variant} variant={variant} />
          ))}
        </Stack>
      </div>
    </Grid>
  )
};
