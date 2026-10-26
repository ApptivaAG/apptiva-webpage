import path from 'node:path'
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  // The mock services reset between tests, so do not run tests concurrently.
  workers: 1,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:3100',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    serviceWorkers: 'block',
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
  webServer: [
    {
      command: 'node e2e/support/mock-services.mjs',
      url: 'http://127.0.0.1:3101/health',
      reuseExistingServer: false,
    },
    {
      command:
        'pnpm exec next dev --turbopack --hostname 127.0.0.1 --port 3100',
      url: 'http://127.0.0.1:3100/kontakt',
      timeout: 180_000,
      // Never reuse a server that might have live credentials or no mocks.
      reuseExistingServer: false,
      env: {
        NODE_OPTIONS: `--import=${path.resolve('e2e/support/intercept.mjs')}`,
        NEXT_TELEMETRY_DISABLED: '1',
        NEXT_DIST_DIR: '.next-e2e',
        NEXT_PUBLIC_SANITY_PROJECT_ID: 'e2e-test',
        NEXT_PUBLIC_SANITY_DATASET: 'test',
        NEXT_PUBLIC_SANITY_API_READ_TOKEN: 'e2e-test-token',
        NEXT_PUBLIC_SANITY_STEGA: 'false',
        RESEND_API_KEY: 're_e2e-test-key',
        RESEND_BASE_URL: 'http://127.0.0.1:3101',
        MAIL_CHIMP_API_KEY: 'e2e-test-key-us13',
        JEV_API_KEY: 'e2e-test-key',
        GOOGLE_REVIEWS_API_KEY: '',
        GOOGLE_REVIEWS_PLACE_ID: '',
        NEXT_PUBLIC_GTAG_ID: '',
      },
    },
  ],
})
