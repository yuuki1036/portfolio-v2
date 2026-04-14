import type { Preview } from "@storybook/react-vite";
// @ts-expect-error - CSS side-effect import; handled by Vite at runtime
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "warm-dark",
      values: [{ name: "warm-dark", value: "#0b0b09" }],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
