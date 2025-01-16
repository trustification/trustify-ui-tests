import { createBdd } from "playwright-bdd";

export const { Given, When, Then } = createBdd();

Given("User is authenticated", async ({ page }) => {
  await page.goto("/");

  const isLoggedIn = await page.locator("text=Your Dashboard").isVisible();
  if (!isLoggedIn) {
    await page.fill('input[name="username"]', "admin");
    await page.fill('input[name="password"]', "admin");
    await page.click('button[type="submit"]');
    await page.waitForSelector("text=Your Dashboard"); // Ensure login was successful
  }
});
