import { test, expect } from "@playwright/test";

test.describe("Importers", { tag: "@tier0" }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Dashboard" }).click();
    await page.getByRole("link", { name: "Importers" }).click();
  });

  test("Page exists and is valid", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Importers" })
    ).toBeVisible();
  });
});
