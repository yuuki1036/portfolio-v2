import type { Meta, StoryObj } from "@storybook/react-vite";
import { SectionLabel } from "./section-label";

const meta = {
  title: "UI/SectionLabel",
  component: SectionLabel,
  args: {
    index: "02",
    label: "Selected Works",
  },
} satisfies Meta<typeof SectionLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const About: Story = {
  args: { index: "03", label: "About" },
};

export const Contact: Story = {
  args: { index: "04", label: "Contact" },
};
