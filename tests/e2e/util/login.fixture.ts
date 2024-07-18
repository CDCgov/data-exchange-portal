import { test as baseTest, expect, Page } from '@playwright/test';
import { login } from './helpers';

type MyFixtures = {
  loggedInPage: Page;
};

const test = baseTest.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    await login(page);
    await use(page);
  },
});

export { test, expect };
