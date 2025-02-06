import { createBdd } from "playwright-bdd";

export const { Given, When, Then } = createBdd();

Given("User is authenticated", async ({ page }) => {
  await page.goto("/");

  let isLoggedIn = process.env.TRUSTIFY_AUTH_ENABLED;

  if (isLoggedIn === "true") {
    await page.fill('input[name="username"]', "admin");
    await page.fill('input[name="password"]', "admin");
    await page.click('button[type="submit"]');
    await page.waitForSelector("text=Your Dashboard"); // Ensure login was successful
  }
});
