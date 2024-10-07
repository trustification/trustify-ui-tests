import { test as teardown } from "@playwright/test";

teardown("Delete initial data", async ({}) => {
  console.log("deleting test data...");
  // Delete the database
});
