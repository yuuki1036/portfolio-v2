import type { Meta, StoryObj } from "@storybook/react-vite";
import { Section } from "./section";
import { SectionLabel } from "#/components/ui/section-label.js";

const meta = {
  title: "Layout/Section",
  component: Section,
  parameters: { layout: "fullscreen" },
  args: {
    variant: "contained",
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["contained", "full"],
    },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = {
  args: { variant: "contained" },
  render: (args) => (
    <Section {...args}>
      <SectionLabel index="02" label="Selected Works" className="mb-16" />
      <div className="border border-border bg-surface p-8 text-text">
        max-w-5xl (1024px) の contained コンテンツ。Nav/Footer と揃った幅。
      </div>
    </Section>
  ),
};

export const Full: Story = {
  args: { variant: "full" },
  render: (args) => (
    <Section {...args}>
      <div className="mx-auto max-w-5xl">
        <SectionLabel index="03" label="About" className="mb-16" />
        <div className="border border-border bg-surface p-8 text-text">
          border-top 付きの full-bleed セクション。内側で任意のグリッドや幅を組む。
        </div>
      </div>
    </Section>
  ),
};

export const Stacked: Story = {
  render: () => (
    <>
      <Section variant="contained">
        <SectionLabel index="01" label="First" className="mb-8" />
        <p className="font-sans text-sub">contained（max-w-5xl）</p>
      </Section>
      <Section variant="full">
        <div className="mx-auto max-w-5xl">
          <SectionLabel index="02" label="Second" className="mb-8" />
          <p className="font-sans text-sub">full（border-top + 幅制限なし）</p>
        </div>
      </Section>
      <Section variant="full">
        <div className="mx-auto max-w-5xl">
          <SectionLabel index="03" label="Third" className="mb-8" />
          <p className="font-sans text-sub">続けて full variant を積む例</p>
        </div>
      </Section>
    </>
  ),
};
