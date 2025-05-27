import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: process.env.CI ? 1 : undefined, // 1 worker no CI, vários localmente
  retries: process.env.CI ? 2 : 0,         // retry 2x no CI, zero local
  use: {
    headless: true,
    trace: 'on-first-retry',
  },
});