import { expect, test } from "../fixtures";

import { SbomService } from "../client";
import { client } from "../client-config";

test("List first 10 sboms by name - vanilla", async ({ request, axios }) => {
  const vanillaResponse = await axios.get(
    "/api/v2/sbom?limit=10&offset=0&sort=name:asc"
  );
  expect(vanillaResponse.data).toEqual(expect.objectContaining({ total: 0 }));
});

test("List first 10 sboms by name - openapi", async ({ request, axios }) => {
  const serviceResponse = await SbomService.listSboms({
    client,
    query: {
      offset: 0,
      limit: 10,
      sort: "name:asc",
    },
  });

  expect(serviceResponse.data).toEqual(expect.objectContaining({ total: 0 }));
});
