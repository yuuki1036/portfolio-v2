import type { Meta, StoryObj } from "@storybook/react-vite";
import { Glitch } from "./glitch";

const meta = {
  title: "UI/Glitch",
  component: Glitch,
  tags: ["autodocs"],
  args: {
    children: "YUKI",
    interval: 3800,
    duration: 220,
  },
} satisfies Meta<typeof Glitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <span className="font-display text-6xl font-bold text-text">
      <Glitch {...args} />
    </span>
  ),
};

export const FastCycle: Story = {
  args: { interval: 1200, duration: 220 },
  render: (args) => (
    <span className="font-display text-6xl font-bold text-text">
      <Glitch {...args} />
    </span>
  ),
};
