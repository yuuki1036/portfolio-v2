import type { Meta, StoryObj } from "@storybook/react-vite";
import { STATS } from "#/data/stats.js";
import { StatsGrid } from "./stats-grid";

const meta = {
  title: "UI/StatsGrid",
  component: StatsGrid,
  parameters: { layout: "padded" },
} satisfies Meta<typeof StatsGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { stats: STATS },
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <StatsGrid {...args} />
    </div>
  ),
};
