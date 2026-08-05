import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Body,
  Grid,
  LoadingOverlay,
  ProgressBar,
  ProgressCircle,
  Skeleton,
  Spinner,
  Stack,
  Title
} from "@/shared/ui";

const meta = {
  title: "Components/Loader",
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component:
          "Enterprise loading primitives including spinner, skeleton, overlay, progress circle, and progress bar. These components use token-driven styling and accessible states."
      }
    }
  }
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

function LoadingOverlayExampleContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 2000);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <Stack gap={24}>
      <Title>Loading overlay</Title>
      <LoadingOverlay active={loading} label="Loading dashboard">
        <div className="rounded-large border border-border bg-surface-raised p-32">
          <Body>
            This content is protected by the loading overlay until the simulated request completes.
          </Body>
        </div>
      </LoadingOverlay>
    </Stack>
  );
}

function ProgressBarExampleContent() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((value) => Math.min(100, value + 9));
    }, 400);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <Stack gap={24}>
      <Title>Progress bar</Title>
      <ProgressBar label="Course sync" value={progress} max={100} variant="primary" size="md" />
      <ProgressBar label="Backup" value={70} max={100} variant="secondary" size="sm" />
      <ProgressBar label="Indeterminate" indeterminate variant="info" size="md" />
    </Stack>
  );
}

export const SpinnerExample: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Spinner</Title>
      <Grid columns={4} gap={24}>
        <Spinner size="xs" variant="primary" label="Loading" />
        <Spinner size="sm" variant="success" label="Fetching" />
        <Spinner size="md" variant="warning" label="Updating" />
        <Spinner size="lg" variant="danger" label="Processing" />
      </Grid>
    </Stack>
  )
};

export const Skeletons: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Skeletons</Title>
      <Grid columns={3} gap={24}>
        <Stack gap={12}>
          <Skeleton shape="text" />
          <Skeleton shape="rect" width="100%" height="120px" />
        </Stack>
        <Stack gap={12}>
          <Skeleton shape="circle" width="72px" />
          <Skeleton shape="rect" width="100%" height="80px" />
        </Stack>
        <Stack gap={12}>
          <Skeleton shape="rect" width="100%" height="40px" />
          <Skeleton shape="rect" width="100%" height="40px" />
        </Stack>
      </Grid>
    </Stack>
  )
};

export const LoadingOverlayExample: Story = {
  render: () => <LoadingOverlayExampleContent />
};

export const ProgressCircleExample: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Progress circle</Title>
      <Grid columns={3} gap={24}>
        <ProgressCircle value={30} variant="primary" label="30%" />
        <ProgressCircle value={65} variant="success" label="Uploading" />
        <ProgressCircle value={100} variant="info" label="Complete" />
      </Grid>
    </Stack>
  )
};

export const ProgressBarExample: Story = {
  render: () => <ProgressBarExampleContent />
};
