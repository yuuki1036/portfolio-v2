import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStartPlugin } from "storybook-addon-tanstack-start/plugin";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  // tanstack-start addon はブラウザ側で node:url を要求して壊れるため addon 登録はしない。
  // Vite plugin (tanstackStartPlugin) のみ viteFinal で使い、
  // ブラウザ側の Router mock は transitive dependency である
  // storybook-addon-tanstack-router を直接使う。
  addons: ["@storybook/addon-docs", "storybook-addon-tanstack-router"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tailwindcss(), tanstackStartPlugin()],
    });
  },
};

export default config;
