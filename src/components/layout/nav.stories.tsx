import type { Meta, StoryObj } from "@storybook/react-vite";
import { tanstackRouterParameters } from "storybook-addon-tanstack-router";
import { Nav } from "./nav";

const meta = {
  title: "Layout/Nav",
  component: Nav,
  parameters: {
    layout: "fullscreen",
    tanstackRouter: tanstackRouterParameters({
      location: { path: "/" },
    }),
  },
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ minHeight: "200vh" }}>
      <Nav />
      <p className="fixed inset-x-0 bottom-6 text-center font-mono text-xs text-muted">
        Scroll down to see the stuck nav variant
      </p>
    </div>
  ),
};

export const OnWorksRoute: Story = {
  parameters: {
    tanstackRouter: tanstackRouterParameters({
      location: { path: "/works" },
    }),
  },
  render: () => (
    <div style={{ minHeight: "200vh" }}>
      <Nav />
    </div>
  ),
};
