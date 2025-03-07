import { expect, test } from "../fixtures";

import { PurlService } from "../client";
import { client } from "../client-config";

test("Purl by alias - vanilla", async ({ request, axios }) => {
  const vanillaResponse = await axios.get("/api/v2/purl?q=openssl");

  expect(vanillaResponse.data.items).toEqual(
    expect.arrayContaining([
      {
        purl: "pkg:rpm/redhat/openssl-libs@3.0.7-24.el9?arch=aarch64",
        base: {
          purl: "pkg:rpm/redhat/openssl-libs",
        },
        version: {
          purl: "pkg:rpm/redhat/openssl-libs@3.0.7-24.el9",
          version: "3.0.7-24.el9",
        },
        qualifiers: { arch: "aarch64" },
      },
      {
        purl: "pkg:rpm/redhat/openssl-libs@3.0.7-24.el9?arch=x86_64",
        base: {
          purl: "pkg:rpm/redhat/openssl-libs",
        },
        version: {
          purl: "pkg:rpm/redhat/openssl-libs@3.0.7-24.el9",
          version: "3.0.7-24.el9",
        },
        qualifiers: { arch: "x86_64" },
      },
    ])
  );
});

test("Purl by alias - openapi", async ({ request, axios }) => {
  const serviceResponse = await PurlService.listPurl({
    client,
    query: {
      q: "openssl",
    },
  });

  expect(serviceResponse.data?.items).toEqual(
    expect.arrayContaining([
      {
        purl: "pkg:rpm/redhat/openssl-libs@3.0.7-24.el9?arch=aarch64",
        base: {
          purl: "pkg:rpm/redhat/openssl-libs",
        },
        version: {
          purl: "pkg:rpm/redhat/openssl-libs@3.0.7-24.el9",
          version: "3.0.7-24.el9",
        },
        qualifiers: { arch: "aarch64" },
      },
      {
        purl: "pkg:rpm/redhat/openssl-libs@3.0.7-24.el9?arch=x86_64",
        base: {
          purl: "pkg:rpm/redhat/openssl-libs",
        },
        version: {
          purl: "pkg:rpm/redhat/openssl-libs@3.0.7-24.el9",
          version: "3.0.7-24.el9",
        },
        qualifiers: { arch: "x86_64" },
      },
    ])
  );
});
