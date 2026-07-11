import type { Meta, StoryObj } from "@storybook/nextjs";
import { AlertTriangle, Check, ChevronRight } from "lucide-react";
import { Badge, BadgeGroup, DotBadge, Grid, Stack, StatusBadge, Title } from "@/shared/ui";
import type { BadgeProps } from "@/shared/ui";

const variants = ["primary", "secondary", "success", "warning", "danger", "info", "neutral"] as const satisfies NonNullable<BadgeProps["variant"]>[];
const sizes = ["xs", "sm", "md", "lg"] as const satisfies NonNullable<BadgeProps["size"]>[];
const appearances = ["solid", "outline", "ghost"] as const satisfies NonNullable<BadgeProps["appearance"]>[];

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: {
    variant: "neutral",
    size: "md",
    appearance: "solid",
    removable: false
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
    appearance: {
      control: "select",
      options: appearances
    },
    removable: {
      control: "boolean"
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "Badge components for enterprise design systems. Badges support variants, sizes, appearance styles, removable interactions, icons, status indicators, and grouped layouts."
      }
    }
  }
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Badge {...args} removable={args.removable} onRemove={() => undefined}>
      New content
    </Badge>
  )
};

export const Variants: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Variants</Title>
      <Grid columns={4} gap={16}>
        {variants.map((variant) => (
          <Badge key={variant} variant={variant} appearance="solid">
            {variant}
          </Badge>
        ))}
      </Grid>
    </Stack>
  )
};

export const Appearances: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Appearances</Title>
      <Grid columns={3} gap={16}>
        {appearances.map((appearance) => (
          <Badge key={appearance} appearance={appearance} variant="primary">
            {appearance}
          </Badge>
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
          <Badge key={size} size={size} variant="primary">
            {size}
          </Badge>
        ))}
      </Stack>
    </Stack>
  )
};

export const Grouping: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Grouped badges</Title>
      <BadgeGroup gap={12}>
        <Badge variant="primary">In review</Badge>
        <Badge variant="success">Completed</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="info">New</Badge>
      </BadgeGroup>
    </Stack>
  )
};

export const Removable: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Removable badges</Title>
      <BadgeGroup gap={12}>
        <Badge variant="primary" removable onRemove={() => undefined}>
          Courses
        </Badge>
        <Badge variant="success" removable onRemove={() => undefined}>
          Completed
        </Badge>
        <Badge variant="info" removable onRemove={() => undefined}>
          Upcoming
        </Badge>
      </BadgeGroup>
    </Stack>
  )
};

export const Icons: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Badges with icons</Title>
      <BadgeGroup gap={12}>
        <Badge variant="success" leftIcon={<Check />}>
          Active
        </Badge>
        <Badge variant="warning" rightIcon={<ChevronRight />}>
          Action
        </Badge>
        <Badge variant="danger" leftIcon={<AlertTriangle />} removable onRemove={() => undefined}>
          Alert
        </Badge>
      </BadgeGroup>
    </Stack>
  )
};

export const Status: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Status badges</Title>
      <BadgeGroup gap={12}>
        <StatusBadge variant="success" status="Online" />
        <StatusBadge variant="warning" status="At risk" />
        <StatusBadge variant="danger" status="Error" />
        <StatusBadge variant="info" status="Scheduled" />
      </BadgeGroup>
    </Stack>
  )
};

export const Dot: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Dot badges</Title>
      <BadgeGroup gap={12}>
        <DotBadge variant="primary" label="Live" />
        <DotBadge variant="success" label="Ready" />
        <DotBadge variant="warning" label="Review" />
        <DotBadge variant="danger" label="Offline" />
      </BadgeGroup>
    </Stack>
  )
};

export const RoundedAndPill: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Rounded and pill shapes</Title>
      <BadgeGroup gap={12}>
        <Badge variant="secondary" rounded>
          Rounded
        </Badge>
        <Badge variant="secondary" pill>
          Pill badge
        </Badge>
      </BadgeGroup>
    </Stack>
  )
};
