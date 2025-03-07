import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const testDir = defineBddConfig({
  features: ["tests/features/@*/*.feature"],
  steps: ["tests/features/**/*.step.ts", "tests/steps/**/*.ts"],
});

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

const DESKTOP_CONFIG = {
  viewport: { height: 961, width: 1920 },
  ignoreHTTPSErrors: true,
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.TRUSTIFY_URL ?? "http://localhost:8080/",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        ...DESKTOP_CONFIG,
      },
      dependencies: ["setup-data"],
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        ...DESKTOP_CONFIG,
      },
      dependencies: ["setup-data"],
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        ...DESKTOP_CONFIG,
      },
      dependencies: ["setup-data"],
    },

    {
      name: "api",
      testDir: "./tests/api",
      testMatch: /.*\.ts/,
      use: {
        baseURL: process.env.TRUSTIFY_URL + "/api",
      },
      dependencies: ["setup-data"],
    },

    {
      name: "setup-data",
      testDir: "./tests/dependencies",
      testMatch: /global\.setup\.ts/,
      teardown: "cleanup-data",
      use: {
        ...DESKTOP_CONFIG,
      },
    },
    {
      name: "cleanup-data",
      testDir: "./tests/dependencies",
      testMatch: /global\.teardown\.ts/,
      use: {
        ...DESKTOP_CONFIG,
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
