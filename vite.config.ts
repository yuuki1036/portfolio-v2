import { defineConfig } from "vite-plus";
import { devtools } from "@tanstack/devtools-vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

const config = defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    ignorePatterns: ["src/routeTree.gen.ts", "src/paraglide/**"],
    options: { typeAware: true, typeCheck: true },
  },
  test: {
    exclude: ["**/node_modules/**", "**/dist/**", "tests/e2e/**"],
  },
  plugins: [
    devtools(),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      strategy: ["url", "cookie", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["en", "/en/:path(.*)?"],
            ["ja", "/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});

export default config;
