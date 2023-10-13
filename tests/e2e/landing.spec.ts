import { test, expect } from "@playwright/test";
import { getEnv } from "./utils";

test.describe("Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(getEnv("DEX_URL"));
  });

  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("DEX");
  });

  test("navigates to SAMS", async ({ page }) => {
    await page.getByText("Login with SAMS").click();
    await page.waitForURL("**auth-stg.cdc.gov**");

    await expect(page).toHaveTitle("Secure Access Management Service");
  });

  test("signs into SAMS", async ({ page }) => {
    await page.getByText("Login with SAMS").click();
    await page.waitForURL("**auth-stg.cdc.gov**");

    await page
      .getByRole("group", { name: "SAMS Credentials" })
      .locator("#USER")
      .fill(getEnv("SAMS_USERNAME"));
    await page
      .getByRole("group", { name: "SAMS Credentials" })
      .locator("#PASSWORD")
      .fill(getEnv("SAMS_PASSWORD"));
    await page
      .getByRole("group", { name: "SAMS Credentials" })
      .getByRole("button")
      .click();

    await expect(page.getByText(/Welcome/)).toContainText(
      getEnv("SAMS_USERNAME")
    );
  });
});
