import type { Meta, StoryObj } from "@storybook/nextjs";
import { UserCircle2 } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  Grid,
  Inline,
  OnlineIndicator,
  Stack,
  Title
} from "@/shared/ui";
import type { AvatarProps } from "@/shared/ui";

const sizes = ["xs", "sm", "md", "lg"] as const satisfies NonNullable<AvatarProps["size"]>[];

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  args: {
    size: "md"
  },
  argTypes: {
    size: {
      control: "select",
      options: sizes
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "Avatar components for enterprise brand systems. Includes fallback handling, grouped layouts, presence indicators, and accessible image rendering."
      }
    }
  }
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80" alt="User avatar" />
      <AvatarFallback>JS</AvatarFallback>
    </Avatar>
  )
};

export const Fallback: Story = {
  render: () => (
    <Avatar size="lg">
      <AvatarImage src="/invalid-path.jpg" alt="Avatar fallback" />
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
  )
};

export const Sizes: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Avatar sizes</Title>
      <Inline gap={24} align="center">
        {sizes.map((size) => (
          <Avatar key={size} size={size}>
            <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80" alt="Profile" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        ))}
      </Inline>
    </Stack>
  )
};

export const Grouping: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Avatar group</Title>
      <AvatarGroup gap={8}>
        <Avatar size="sm">
          <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80" alt="User 1" />
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80" alt="User 2" />
          <AvatarFallback>ML</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback>SV</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </Stack>
  )
};

export const PresenceIndicator: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Presence indicators</Title>
      <Grid columns={4} gap={24}>
        <Inline className="relative" gap={12} align="center">
          <Avatar size="md">
            <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80" alt="User online" />
            <AvatarFallback>OL</AvatarFallback>
          </Avatar>
          <OnlineIndicator variant="success" size="sm" label="Online" className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4" />
        </Inline>
        <Inline className="relative" gap={12} align="center">
          <Avatar size="md">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80" alt="User away" />
            <AvatarFallback>AW</AvatarFallback>
          </Avatar>
          <OnlineIndicator variant="warning" size="sm" label="Away" className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4" />
        </Inline>
        <Inline className="relative" gap={12} align="center">
          <Avatar size="md">
            <AvatarImage src="/invalid-path.jpg" alt="User busy" />
            <AvatarFallback>BS</AvatarFallback>
          </Avatar>
          <OnlineIndicator variant="danger" size="sm" label="Busy" className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4" />
        </Inline>
        <Inline className="relative" gap={12} align="center">
          <Avatar size="md">
            <AvatarFallback>
              <UserCircle2 />
            </AvatarFallback>
          </Avatar>
          <OnlineIndicator variant="neutral" size="sm" label="Offline" className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4" />
        </Inline>
      </Grid>
    </Stack>
  )
};

export const InitialsFallback: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Initials fallback</Title>
      <Inline gap={24} align="center">
        <Avatar size="lg">
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
      </Inline>
    </Stack>
  )
};
