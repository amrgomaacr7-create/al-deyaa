import type { Meta, StoryObj } from "@storybook/nextjs";
import { ArrowRight, BookOpen, Check, LoaderCircle } from "lucide-react";

import { Body, Button, Grid, Stack, Title } from "@/shared/ui";
import type { ButtonProps } from "@/shared/ui";

const variants = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "link",
  "success",
  "warning",
  "danger"
] as const satisfies NonNullable<ButtonProps["variant"]>[];

const sizes = ["xs", "sm", "md", "lg", "xl", "icon"] as const satisfies NonNullable<
  ButtonProps["size"]
>[];

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Continue lesson",
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    fullWidth: false,
    iconOnly: false
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
    disabled: {
      control: "boolean"
    },
    loading: {
      control: "boolean"
    },
    fullWidth: {
      control: "boolean"
    },
    iconOnly: {
      control: "boolean"
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "The reference Al-Deyaa Button. It demonstrates token-driven variants, accessible states, loading semantics, icons, and composable layout."
      }
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <Button {...args} />
};

export const Variants: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Variants</Title>
      <Grid columns={4} gap={16}>
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
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
          <Button key={size} size={size} iconOnly={size === "icon"} leftIcon={<BookOpen />}>
            {size}
          </Button>
        ))}
      </Stack>
    </Stack>
  )
};

export const States: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>States</Title>
      <Grid columns={4} gap={16}>
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
        <Button autoFocus>Keyboard focus</Button>
      </Grid>
      <Body color="soft">
        Use keyboard navigation in the canvas to verify focus visibility and activation behavior.
      </Body>
    </Stack>
  )
};

export const Icons: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Icons</Title>
      <Grid columns={3} gap={16}>
        <Button leftIcon={<BookOpen />}>Start lesson</Button>
        <Button rightIcon={<ArrowRight />}>Continue</Button>
        <Button iconOnly aria-label="Mark complete" size="icon">
          <Check />
        </Button>
      </Grid>
    </Stack>
  )
};

export const Loading: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Loading</Title>
      <Grid columns={3} gap={16}>
        <Button loading>Saving progress</Button>
        <Button loading variant="secondary">
          Preparing lesson
        </Button>
        <Button iconOnly loading loadingLabel="Loading lesson" size="icon">
          <LoaderCircle />
        </Button>
      </Grid>
    </Stack>
  )
};

export const FullWidth: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Full width</Title>
      <Button fullWidth rightIcon={<ArrowRight />}>
        Continue study session
      </Button>
    </Stack>
  )
};

export const ThemeComparison: Story = {
  render: () => (
    <Grid columns={2} gap={24}>
      <div data-theme="light">
        <Stack className="rounded-large border border-border bg-background p-24 text-text" gap={16}>
          <Title>Light mode</Title>
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </Stack>
      </div>
      <div data-theme="dark">
        <Stack className="rounded-large border border-border bg-background p-24 text-text" gap={16}>
          <Title>Dark mode</Title>
          {variants.map((variant) => (
            <Button key={variant} variant={variant} leftIcon={<BookOpen />}>
              {variant}
            </Button>
          ))}
        </Stack>
      </div>
    </Grid>
  )
};
