import path from "path";
import { expect, test } from "@playwright/test";

test.describe("Ingest initial data", () => {
  test("SBOMs", async ({ page, baseURL }) => {
    await page.goto(baseURL!);
    await page.getByRole("link", { name: "Upload" }).click();
    await page.getByRole("tab", { name: "SBOM" }).click();

    // Choose files
    const files = [
      "quarkus-bom-2.13.8.Final-redhat-00004.json",
      "ubi8_ubi-micro-8.8-7.1696517612.json",
      "ubi8-8.8-1067.json",
      "ubi8-minimal-8.8-1072.1697626218.json",
      "ubi9-9.3-782.json",
      "ubi9-minimal-9.3-1361.json",
    ];

    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByRole("button", { name: "Upload", exact: true }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(
      files.map((e) => path.join(__dirname, `../fixures/sbom/${e}`))
    );

    // Assert
    await expect(
      page.locator(".pf-v5-c-expandable-section__toggle-text")
    ).toContainText("6 of 6 files uploaded");
  });

  test("Advisories", async ({ page, baseURL }) => {
    test.setTimeout(120_000);

    await page.goto(baseURL!);
    await page.getByRole("link", { name: "Upload" }).click();
    await page.getByRole("tab", { name: "Advisory" }).click();

    // Choose files
    const files = [
      "cve-2022-45787.json",
      "cve-2023-20861.json",
      "cve-2023-2974.json",
      "cve-2023-0044.json",
      "cve-2023-20862.json",
      "cve-2023-2976.json",
      "cve-2023-0481.json",
      "cve-2023-21971.json",
      "cve-2023-3223.json",
      "cve-2023-0482.json",
      "cve-2023-2454.json",
      "cve-2023-33201.json",
      "cve-2023-1108.json",
      "cve-2023-2455.json",
      "cve-2023-34453.json",
      "cve-2023-1370.json",
      "cve-2023-24815.json",
      "cve-2023-34454.json",
      "cve-2023-1436.json",
      "cve-2023-24998.json",
      "cve-2023-34455.json",
      "cve-2023-1584.json",
      "cve-2023-26464.json",
      "cve-2023-44487.json",
      "cve-2023-1664.json",
      "cve-2023-2798.json",
      "cve-2023-4853.json",
      "cve-2023-20860.json",
      "cve-2023-28867.json",
    ];

    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByRole("button", { name: "Upload", exact: true }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(
      files.map((e) => path.join(__dirname, `../fixures/csaf/${e}`))
    );

    // Assert
    await expect(
      page.locator(".pf-v5-c-expandable-section__toggle-text")
    ).toContainText("29 of 29 files uploaded", { timeout: 60_000 });
  });
});
