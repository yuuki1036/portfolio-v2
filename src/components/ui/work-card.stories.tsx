import type { Meta, StoryObj } from "@storybook/react-vite";
import { tanstackRouterParameters } from "storybook-addon-tanstack-router";
import { WORKS } from "#/data/works.js";
import { WorkCard } from "./work-card";

const meta = {
  title: "UI/WorkCard",
  component: WorkCard,
  parameters: {
    layout: "padded",
    tanstackRouter: tanstackRouterParameters({
      location: { path: "/" },
    }),
  },
  args: { work: WORKS[0]!, to: "/works" },
} satisfies Meta<typeof WorkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <WorkCard {...args} />
    </div>
  ),
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-px border border-border bg-border">
      {WORKS.map((work) => (
        <WorkCard key={work.slug} work={work} to="/works" />
      ))}
    </div>
  ),
};

export const ExternalLink: Story = {
  name: "External link (href)",
  render: () => (
    <div className="grid grid-cols-3 gap-px border border-border bg-border">
      {WORKS.map((work) => (
        <WorkCard key={work.slug} work={work} href={work.launch ?? work.source} />
      ))}
    </div>
  ),
};
