import type { Decorator, Preview } from "@storybook/react-vite";
import { decorators as tanstackDecorators } from "storybook-addon-tanstack-router/preview";
import { locales, overwriteGetLocale, type Locale } from "#/paraglide/runtime.js";
// @ts-expect-error - CSS side-effect import; handled by Vite at runtime
import "../src/styles.css";

const withParaglideLocale: Decorator = (Story, context) => {
  const locale = (context.globals.locale as Locale | undefined) ?? "ja";
  overwriteGetLocale(() => locale);
  // Remount on locale change so paraglide message calls pick up the new value
  return <Story key={locale} />;
};

const withWarmDarkBg: Decorator = (Story) => (
  <div className="min-h-screen bg-bg text-text">
    <Story />
  </div>
);

const preview: Preview = {
  globalTypes: {
    locale: {
      description: "Paraglide locale",
      defaultValue: "ja",
      toolbar: {
        title: "Locale",
        icon: "globe",
        items: locales.map((l) => ({ value: l, title: l.toUpperCase() })),
        dynamicTitle: true,
      },
    },
  },
  decorators: [withWarmDarkBg, withParaglideLocale, ...tanstackDecorators],
  parameters: {
    backgrounds: {
      options: {
        "warm-dark": { name: "warm-dark", value: "#0b0b09" },
      },
    },
    initialGlobals: {
      backgrounds: { value: "warm-dark" },
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
