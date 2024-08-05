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

  test("Search by name", async ({ page }) => {
    await page.getByPlaceholder("Search by name...").click();
    await page.getByPlaceholder("Search by name...").fill("2024");
    await page.getByLabel("search button for search input").click();

    await expect(page.getByLabel("CVEs table")).toContainText("cve-from-2024");
    await expect(page.getByLabel("CVEs table")).toContainText(
      "redhat-csaf-vex-2024"
    );
  });
});
