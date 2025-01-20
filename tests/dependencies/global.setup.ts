import path from "path";
import { expect, Page, test } from "@playwright/test";

test.describe("Ingest initial data", () => {
  test("SBOMs", async ({ page, baseURL }) => {
    await page.goto(baseURL!);
    await page.getByRole("link", { name: "Upload" }).click();

    const sbom_files = [
      "quarkus-bom-2.13.8.Final-redhat-00004.json.bz2",
      "ubi8_ubi-micro-8.8-7.1696517612.json.bz2",
      "ubi8-8.8-1067.json.bz2",
      "ubi8-minimal-8.8-1072.1697626218.json.bz2",
      "ubi9-9.3-782.json.bz2",
      "ubi9-minimal-9.3-1361.json.bz2",
    ];

    const advisory_files = [
      "cve-2022-45787.json.bz2",
      "cve-2023-20861.json.bz2",
      "cve-2023-2974.json.bz2",
      "cve-2023-0044.json.bz2",
      "cve-2023-20862.json.bz2",
      "cve-2023-2976.json.bz2",
      "cve-2023-0481.json.bz2",
      "cve-2023-21971.json.bz2",
      "cve-2023-3223.json.bz2",
      "cve-2023-0482.json.bz2",
      "cve-2023-2454.json.bz2",
      "cve-2023-33201.json.bz2",
      "cve-2023-1108.json.bz2",
      "cve-2023-2455.json.bz2",
      "cve-2023-34453.json.bz2",
      "cve-2023-1370.json.bz2",
      "cve-2023-24815.json.bz2",
      "cve-2023-34454.json.bz2",
      "cve-2023-1436.json.bz2",
      "cve-2023-24998.json.bz2",
      "cve-2023-34455.json.bz2",
      "cve-2023-1584.json.bz2",
      "cve-2023-26464.json.bz2",
      // "cve-2023-44487.json.bz2", // HTTP 413 error: file to big to be uploaded
      "cve-2023-1664.json.bz2",
      "cve-2023-2798.json.bz2",
      "cve-2023-4853.json.bz2",
      "cve-2023-20860.json.bz2",
      "cve-2023-28867.json.bz2",
    ];

    await uploadSboms(page, sbom_files);
    await uploadAdvisories(page, advisory_files);

  });
});

const uploadSboms = async (page: Page, files: string[]) => {
  await page.getByRole("tab", { name: "SBOM" }).click();

  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.getByRole("button", { name: "Upload", exact: true }).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(
    files.map((e) => path.join(__dirname, `../fixtures/sbom/${e}`))
  );

  await expect(
    page.locator(
      "#upload-sbom-tab-content .pf-v5-c-expandable-section__toggle-text"
    )
  ).toContainText(`${files.length} of ${files.length} files uploaded`, {
    timeout: 60_000,
  });
};

const uploadAdvisories = async (page: Page, files: string[]) => {
  await page.getByRole("tab", { name: "Advisory" }).click();

  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.getByRole("button", { name: "Upload", exact: true }).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(
    files.map((e) => path.join(__dirname, `../fixtures/csaf/${e}`))
  );

  await expect(
    page.locator(
      "#upload-advisory-tab-content .pf-v5-c-expandable-section__toggle-text"
    )
  ).toContainText(`${files.length} of ${files.length} files uploaded`, {
    timeout: 60_000,
  });
};
