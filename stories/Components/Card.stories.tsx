import type { Meta, StoryObj } from "@storybook/nextjs";
import { Body, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Grid, Stack, Title } from "@/shared/ui";
import type { CardProps } from "@/shared/ui";

const variants = ["elevated", "outlined", "filled", "ghost"] as const satisfies NonNullable<CardProps["variant"]>[];
const sizes = ["sm", "md", "lg"] as const satisfies NonNullable<CardProps["size"]>[];

const meta = {
  title: "Components/Card",
  component: Card,
  args: {
    variant: "elevated",
    size: "md"
  },
  argTypes: {
    variant: {
      control: "select",
      options: variants
    },
    size: {
      control: "select",
      options: sizes
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "A composable Card system for enterprise surfaces. It supports elevation, outlined, filled, and ghost variants, responsive sizing, and structured card anatomy with accessible headings and content sections."
      }
    }
  }
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

const ExampleCard = ({ variant, size }: Pick<CardProps, "variant" | "size">) => (
  <Card variant={variant} size={size}>
    <CardHeader>
      <CardTitle>Learning pathway overview</CardTitle>
      <CardDescription>
        Review your current learning path, upcoming milestones, and recommended next actions for the
        current course.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Stack gap={16}>
        <Body>
          The card component is designed to hold content in a clear, accessible container with consistent
          spacing and token-driven surface styles.
        </Body>
        <Body color="soft">Use card headers and footers to organize related content in structured sections.</Body>
      </Stack>
    </CardContent>
    <CardFooter>
      <Body color="soft">Updated 2 hours ago</Body>
      <Button variant="secondary" size="sm">
        Review plan
      </Button>
    </CardFooter>
  </Card>
);

export const Playground: Story = {
  render: (args) => (
    <div className="max-w-[760px]">
      <Card {...args}>
        <CardHeader>
          <CardTitle>Workspace analytics</CardTitle>
          <CardDescription>
            A brief summary of the workspace activity and recent updates to help you stay informed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Body>
            Cards are the building blocks of enterprise layouts. They provide visual hierarchy and content
            grouping while reusing design tokens across surfaces.
          </Body>
        </CardContent>
        <CardFooter>
          <Body color="soft">Last synced 12 minutes ago</Body>
          <Button variant="primary" size="sm">
            Sync now
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
};

export const Variants: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Variants</Title>
      <Grid columns={2} gap={24}>
        {variants.map((variant) => (
          <ExampleCard key={variant} variant={variant} size="md" />
        ))}
      </Grid>
    </Stack>
  )
};

export const Sizes: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Sizes</Title>
      <Grid columns={3} gap={24}>
        {sizes.map((size) => (
          <ExampleCard key={size} variant="elevated" size={size} />
        ))}
      </Grid>
    </Stack>
  )
};

export const HeaderFooterLayout: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Header / Footer layout</Title>
      <Card variant="outlined" size="md">
        <CardHeader>
          <CardTitle>Quarterly goals</CardTitle>
          <CardDescription>Organize the team focus areas for the upcoming quarter with clear alignment.</CardDescription>
        </CardHeader>
        <CardContent>
          <Stack gap={12}>
            <Body>
              Use the card content area to display key metrics, summaries, or contextual details in a
              readable format.
            </Body>
            <Body color="soft">The footer keeps actions and status aligned while the header communicates intent.</Body>
          </Stack>
        </CardContent>
        <CardFooter>
          <Body color="soft">2 active initiatives</Body>
          <Button variant="secondary" size="sm">
            View details
          </Button>
        </CardFooter>
      </Card>
    </Stack>
  )
};
