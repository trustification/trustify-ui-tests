import path from "path";
import { expect, Page, test } from "@playwright/test";
import { login } from "../helpers/Auth";
import { ADVISORY_FILES, SBOM_FILES } from "../../common/constants";

test.describe("Ingest initial data", () => {
  test.skip(
    process.env.SKIP_INGESTION === "true",
    "Skipping global.setup data ingestion"
  );

  test("Upload files", async ({ page, baseURL }) => {
    await login(page);

    await page.goto(baseURL!);
    await page.getByRole("link", { name: "Upload" }).click();

    test.setTimeout(120_000);
    await uploadSboms(page, SBOM_FILES);
    await uploadAdvisories(page, ADVISORY_FILES);
  });
});

const uploadSboms = async (page: Page, files: string[]) => {
  await page.getByRole("tab", { name: "SBOM" }).click();

  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.getByRole("button", { name: "Upload", exact: true }).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(
    files.map((e) => path.join(__dirname, `../../common/assets/sbom/${e}`))
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
    files.map((e) => path.join(__dirname, `../../common/assets/csaf/${e}`))
  );

  await expect(
    page.locator(
      "#upload-advisory-tab-content .pf-v5-c-expandable-section__toggle-text"
    )
  ).toContainText(`${files.length} of ${files.length} files uploaded`, {
    timeout: 60_000,
  });
};
