import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://dexdev.cdc.gov/");

  await expect(page).toHaveTitle("DEX");
});

test("navigates to SAMS", async ({ page }) => {
  await page.goto("https://dexdev.cdc.gov/");

  await page.getByText("Login with SAMS").click();

  await expect(page).toHaveTitle("Secure Access Management Service");
});

test("signs into SAMS", async ({ page }) => {
  await page.goto("https://dexdev.cdc.gov/");

  await page.getByText("Login with SAMS").click();

  await page
    .getByRole("group", { name: "SAMS Credentials" })
    .locator("#USER")
    .fill("chase.farmer@gsa.gov");
  await page
    .getByRole("group", { name: "SAMS Credentials" })
    .locator("#PASSWORD")
    .fill("Sphs2013!");
  await page
    .getByRole("group", { name: "SAMS Credentials" })
    .getByRole("button")
    .click();

  await expect(page.locator("p")).toContainText("chase.farmer@gsa.gov");
});
