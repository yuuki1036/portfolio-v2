import type { Meta, StoryObj } from "@storybook/react-vite";
import { SectionHeading } from "./section-heading";

const meta = {
  title: "UI/SectionHeading",
  component: SectionHeading,
  parameters: { layout: "padded" },
  args: {
    as: "h2",
    size: "md",
  },
  argTypes: {
    as: { control: { type: "radio" }, options: ["h1", "h2"] },
    size: { control: { type: "radio" }, options: ["md", "lg"] },
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AboutH: Story = {
  name: "md (.about-h 相当)",
  args: { size: "md" },
  render: (args) => (
    <SectionHeading {...args}>
      Building fast,
      <br />
      <em>shipping</em> faster.
    </SectionHeading>
  ),
};

export const ContactH: Story = {
  name: "lg (.ct-h 相当)",
  args: { size: "lg" },
  render: (args) => (
    <SectionHeading {...args}>
      Let's build
      <br />
      <em>something.</em>
    </SectionHeading>
  ),
};

export const AsH1: Story = {
  args: { as: "h1", size: "lg" },
  render: (args) => (
    <SectionHeading {...args}>
      Portfolio <em>v2</em>
    </SectionHeading>
  ),
};
