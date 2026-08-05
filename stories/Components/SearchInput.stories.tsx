import type { Meta, StoryObj } from "@storybook/nextjs";
import { Search, Filter, MapPin } from "lucide-react";

import { SearchInput, Stack, Title, Body, Grid } from "@/shared/ui";

const meta = {
  title: "Components/SearchInput",
  component: SearchInput,
  args: {
    placeholder: "Search...",
    clearable: true,
    disabled: false,
    readOnly: false,
    loading: false
  },
  argTypes: {
    clearable: {
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
          "The SearchInput component is a specialized text input for search functionality. It includes a search icon and a clear button, and supports all standard input features with accessibility support."
      }
    }
  }
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <SearchInput {...args} />
};

export const Default: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Default Search Input</Title>
      <SearchInput placeholder="Search..." />
    </Stack>
  )
};

export const WithCustomIcon: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>With Custom Search Icon</Title>
      <SearchInput searchIcon={<MapPin />} placeholder="Search locations..." />
    </Stack>
  )
};

export const WithoutClearButton: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Without Clear Button</Title>
      <SearchInput clearable={false} placeholder="Search without clear button..." />
    </Stack>
  )
};

export const States: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>States</Title>
      <Grid columns={2} gap={16}>
        <Stack gap={4}>
          <Body color="soft">Default</Body>
          <SearchInput placeholder="Search..." />
        </Stack>

        <Stack gap={4}>
          <Body color="soft">With Value</Body>
          <SearchInput defaultValue="current search" placeholder="Search..." />
        </Stack>

        <Stack gap={4}>
          <Body color="soft">Disabled</Body>
          <SearchInput disabled placeholder="Search disabled..." />
        </Stack>

        <Stack gap={4}>
          <Body color="soft">Loading</Body>
          <SearchInput loading placeholder="Searching..." />
        </Stack>
      </Grid>
    </Stack>
  )
};

export const SearchExamples: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Search Examples</Title>
      <Grid columns={2} gap={16}>
        <Stack gap={8}>
          <Body color="soft">User Search</Body>
          <SearchInput placeholder="Search by name or email..." />
        </Stack>

        <Stack gap={8}>
          <Body color="soft">Product Search</Body>
          <SearchInput placeholder="Find products by name..." />
        </Stack>

        <Stack gap={8}>
          <Body color="soft">Location Search</Body>
          <SearchInput searchIcon={<MapPin />} placeholder="Search locations..." />
        </Stack>

        <Stack gap={8}>
          <Body color="soft">Advanced Search</Body>
          <SearchInput placeholder="Enter keywords..." />
        </Stack>
      </Grid>
    </Stack>
  )
};

export const FormIntegration: Story = {
  render: () => (
    <Stack gap={24}>
      <Title>Form Integration</Title>
      <Grid columns={2} gap={24}>
        <Stack gap={8}>
          <label className="text-small font-medium text-text">
            Search Users <span className="text-danger">*</span>
          </label>
          <SearchInput
            aria-label="Search users"
            placeholder="Type to search users..."
          />
          <div className="text-caption text-text-soft">
            Search by name, email, or user ID
          </div>
        </Stack>

        <Stack gap={8}>
          <label className="text-small font-medium text-text">
            Search Lessons <span className="text-danger">*</span>
          </label>
          <SearchInput
            aria-label="Search lessons"
            placeholder="Find lessons..."
          />
          <div className="text-caption text-text-soft">
            Search by title, category, or level
          </div>
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
          <label className="text-small font-medium text-text" htmlFor="search-field">
            Search <span className="text-danger">*</span>
          </label>
          <SearchInput
            aria-describedby="search-hint"
            aria-label="Search field"
            aria-required={true}
            id="search-field"
            placeholder="Search..."
          />
          <div className="text-caption text-text-soft" id="search-hint">
            Enter your search query. Click the X button or clear the field to reset.
          </div>
        </Stack>

        <Body color="soft" className="mt-8">
          The search input provides:
        </Body>
        <ul className="list-inside list-disc space-y-2 text-body text-text-soft">
          <li>Search icon for visual identification</li>
          <li>Clear button for quick reset</li>
          <li>Proper type attribute (type="search")</li>
          <li>Native browser search functionality</li>
          <li>Full keyboard navigation support</li>
          <li>ARIA labels and descriptions</li>
        </ul>
      </Stack>
    </Stack>
  )
};

export const PerformanceExample: Story = {
  render: () => (
    <Stack gap={16}>
      <Title>Real-time Search Example</Title>
      <Stack gap={12}>
        <SearchInput placeholder="Type to search (e.g., 'learn', 'course', 'lesson')" />
        <div className="rounded-medium border border-border bg-surface-raised p-16">
          <Body color="soft">Search results will appear here as you type...</Body>
        </div>
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
            <SearchInput placeholder="Default" />
            <SearchInput disabled placeholder="Disabled" />
            <SearchInput defaultValue="search term" placeholder="With value" />
            <SearchInput loading placeholder="Loading" />
          </Stack>
        </Stack>
      </div>
      <div data-theme="dark">
        <Stack className="rounded-large border border-border bg-background p-24 text-text" gap={16}>
          <Title>Dark Mode</Title>
          <Stack gap={12}>
            <SearchInput placeholder="Default" />
            <SearchInput disabled placeholder="Disabled" />
            <SearchInput defaultValue="search term" placeholder="With value" />
            <SearchInput loading placeholder="Loading" />
          </Stack>
        </Stack>
      </div>
    </Grid>
  )
};
