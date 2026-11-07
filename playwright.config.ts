import { defineConfig, devices } from "@playwright/test";

/**
 * contact の loader は server env を検証し、未設定なら 500 を返す。
 * smoke test はメールを送らないので、未設定の項目だけ .dev.vars.example の
 * テスト値（Turnstile は常に PASS のテストキー）で埋める。
 */
const SMOKE_ENV_DEFAULTS: Record<string, string> = {
  RESEND_API_KEY: "re_smoke_test_dummy",
  CONTACT_TO_EMAIL: "you@example.com",
  CONTACT_FROM_EMAIL: "contact@example.com",
  TURNSTILE_SITE_KEY: "1x00000000000000000000AA",
  TURNSTILE_SECRET_KEY: "1x0000000000000000000000000000000AA",
};

const webServerEnv: Record<string, string> = { ...SMOKE_ENV_DEFAULTS };
for (const [key, value] of Object.entries(process.env)) {
  if (value !== undefined) webServerEnv[key] = value;
}

/**
 * Playwright configuration for portfolio-v2.
 * vp dev を webServer として起動し、localhost:3000 に対してテストを走らせる。
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: "ignore",
    stderr: "pipe",
    env: webServerEnv,
  },
});
