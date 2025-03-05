/* Example of testing API with SBOM and PURL endpoints */

import { test, expect } from "@playwright/test";
import { get_token, get_token_header } from "../helpers/Auth";

// currently our global setup uploads just 6 sboms - so we cannot assert 10+
const MIN_SBOMS_PRESENT = 6;

// FIXME: possibly better to have this invoked just once at start from global-setup
test.beforeAll(async ({ playwright }) => {
  console.log("hello"); // FIXME: DEBUG

  let request = await playwright.request.newContext();
  let token = await get_token(request);
  request.dispose();

  console.log("token before test: " + token); // FIXME: DEBUG
});

test("oidc", async ({ request }) => {
  let token = await get_token(request);
  console.log("token in test: " + token);
});

test("list first 10 sboms by name", async ({ request }) => {
  // FIXME: easiest way for obtaining token here?
  //        - seems proper way may be using extra Fixture e.g. https://stackoverflow.com/a/72294948 ?
  //        - or bit worse but also working to have test.beforeEach to set-refresh token?
  //          but for that we still would need explicitely mention/refer to it with each request call?
  //        - for this first example going with explicit call from inside test
  const sbomResp = await request.get(
    "/api/v2/sbom?limit=10&offset=0&sort=name:asc",
    {
      headers: await get_token_header(request),
    }
  );
  expect(sbomResp).toBeOK();
  const sbomJson = await sbomResp.json();
  expect(sbomJson).toHaveProperty("items");
  expect(sbomJson["items"].length).toBeGreaterThanOrEqual(MIN_SBOMS_PRESENT);
  sbomJson["items"].forEach((sbom) => {
    expect(sbom).toHaveProperty("name");
    expect(sbom).toHaveProperty("number_of_packages");
    expect(sbom).toHaveProperty("ingested");
    // FIXME: DEBUG
    console.log(
      `SBOM ${sbom["name"]} with ${sbom["number_of_packages"]} at ${sbom["ingested"]}`
    );
  });
});

test("purl by alias", async ({ request }) => {
  // FIXME: what is easiest way for obtaining token here?
  const resp = await request.get("/api/v2/purl?q=openssl", {
    headers: await get_token_header(request),
  });
  expect(resp).toBeOK();
  const purls = await resp.json();
  expect(purls).toHaveProperty("items");
  // now here assert either structure (no idea if these are valid asserts, just demo)
  purls.items.forEach((purl) => {
    expect(purl).toHaveProperty("uuid");
    expect(purl).toHaveProperty("purl");
    expect(purl).toHaveProperty("base");
    expect(purl).toHaveProperty("version");
    expect(purl).toHaveProperty("qualifiers");
  });
  // or some exact data/entries
  expect(purls.items).toEqual(
    expect.arrayContaining([
      {
        uuid: "0ba8c525-a930-5e55-b8bb-3a666e5048b7",
        purl: "pkg:rpm/redhat/openssl-libs@3.0.7-24.el9?arch=aarch64",
        base: {
          uuid: "69997203-ffc5-51e5-bae9-1881bb9fa8d7",
          purl: "pkg:rpm/redhat/openssl-libs",
        },
        version: {
          uuid: "b23d2c3f-a54a-5e81-8665-2013d4cc4d17",
          purl: "pkg:rpm/redhat/openssl-libs@3.0.7-24.el9",
          version: "3.0.7-24.el9",
        },
        qualifiers: { arch: "aarch64" },
      },
      {
        uuid: "11ea8077-d87b-53ef-b8a7-8c64267cb290",
        purl: "pkg:rpm/redhat/openssl-libs@3.0.7-24.el9?arch=x86_64",
        base: {
          uuid: "69997203-ffc5-51e5-bae9-1881bb9fa8d7",
          purl: "pkg:rpm/redhat/openssl-libs",
        },
        version: {
          uuid: "b23d2c3f-a54a-5e81-8665-2013d4cc4d17",
          purl: "pkg:rpm/redhat/openssl-libs@3.0.7-24.el9",
          version: "3.0.7-24.el9",
        },
        qualifiers: { arch: "x86_64" },
      },
    ])
  );

  //  expect(sbom).toHaveProperty('ingested');
  //  // FIXME: DEBUG
  //  console.log(`SBOM ${sbom['name']} with ${sbom['number_of_packages']} at ${sbom['ingested']}`);
  //});
  // FIXME: DEBUG
  console.log(purls.items);
});
