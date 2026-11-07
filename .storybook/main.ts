import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStartPlugin } from "storybook-addon-tanstack-start/plugin";
import { mergeConfig, type PluginOption } from "vite";

// Storybook は vite.config.ts の plugin も読み込む。アプリ本体用の
// TanStack Start / nitro / devtools の plugin が残ると、Start の client entry
// (@tanstack/react-start/client) までバンドルしようとし、
// tanstackStartPlugin の alias で stub 配下のパスに解決されて build が落ちる。
const APP_ONLY_PLUGIN_PREFIXES = [
  "tanstack-start",
  "tanstack-react-start",
  "tanstack-router:",
  "tanstack:router-generator",
  "@tanstack/devtools",
  "nitro:",
  "fullstack:",
];

function withoutAppOnlyPlugins(plugins: PluginOption[] | undefined): PluginOption[] {
  return (plugins ?? []).flat(Infinity as 1).filter((plugin) => {
    const name =
      plugin && typeof plugin === "object" && "name" in plugin ? String(plugin.name) : "";
    return !APP_ONLY_PLUGIN_PREFIXES.some((prefix) => name.startsWith(prefix));
  });
}

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
    return mergeConfig(
      { ...config, plugins: withoutAppOnlyPlugins(config.plugins) },
      {
        plugins: [tailwindcss(), tanstackStartPlugin()],
      },
    );
  },
};

export default config;
