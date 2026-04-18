import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typewriter } from "./typewriter";

const DEFAULT_ROLES = [
  "TypeScript Engineer_",
  "React Specialist_",
  "UI/UX Craftsman_",
  "TanStack Enthusiast_",
];

const meta = {
  title: "UI/Typewriter",
  component: Typewriter,
  tags: ["autodocs"],
  args: {
    roles: DEFAULT_ROLES,
    showCaret: true,
  },
} satisfies Meta<typeof Typewriter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <span className="font-mono text-xl text-text">
      <Typewriter {...args} />
    </span>
  ),
};

export const FastStart: Story = {
  args: { startDelay: 200, typeSpeed: 40, deleteSpeed: 20, holdDuration: 1000 },
  render: (args) => (
    <span className="font-mono text-xl text-text">
      <Typewriter {...args} />
    </span>
  ),
};
