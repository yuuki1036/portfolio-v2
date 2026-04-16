import type { Meta, StoryObj } from "@storybook/react-vite";
import { Reveal } from "./reveal";

const meta = {
  title: "UI/Reveal",
  component: Reveal,
  tags: ["autodocs"],
  args: {
    delay: 0,
  },
} satisfies Meta<typeof Reveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ paddingTop: "120vh", paddingBottom: "50vh" }}>
      <Reveal {...args}>
        <div className="p-8 bg-surface border border-border text-text">
          スクロールで出現するコンテンツ（threshold 0.08）
        </div>
      </Reveal>
    </div>
  ),
};

export const Staggered: Story = {
  render: () => (
    <div style={{ paddingTop: "120vh", paddingBottom: "50vh" }} className="flex flex-col gap-4">
      {[0, 0.15, 0.3, 0.45].map((d) => (
        <Reveal key={d} delay={d}>
          <div className="p-6 bg-surface border border-border text-text">delay = {d}s</div>
        </Reveal>
      ))}
    </div>
  ),
};
