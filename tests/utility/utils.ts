import dotenv from "dotenv";
dotenv.config({ path: "tests/e2e/config/.env" });

type EnvType = "DEX_URL" | "SAMS_USERNAME" | "SAMS_PASSWORD";

import AxeBuilder from "@axe-core/playwright";

import { Page } from "playwright-core";

export function getEnv(name: EnvType): string {
  return process.env[name] || "";
}

export async function Check508Compliance(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  const { violations } = results;

  return violations;
}
