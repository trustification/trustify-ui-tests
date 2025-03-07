import { test as test_base } from "@playwright/test";
import { get_token_header } from "./Auth";

export const api_test = test_base.extend({
  request: async ({ request }, use) => {
    /**
     * APIRequestContext which automatically adds auth headers
     *
     * @example Allow sending request without caring about auth
     * ```ts
     * request.get('/url/some')
     * request.post('/url/else', { data: "payload" })
     * request.put('/url/extra', { data: "payload", headers: { Custom: 'x'} })
     * ```
     * Acts as APIReqestContext {@link https://playwright.dev/docs/api/class-apirequestcontext}
     * (it wraps the original request context),
     * while it also obtains token from Auth helper, and if provided (auth is enabled),
     * ensures it is added to the issued request headers.
     */

    const MAGIC = async (options) => {
      // FIXME: rename and see if can be placed outside this object
      const token_headers = await get_token_header(request);
      if (Object.keys(token_headers).length == 0) {
        return options;
      }
      if (!options) {
        return { headers: token_headers };
      }
      if (!options.headers) {
        return { ...options, headers: token_headers };
      }
      return { ...options, headers: { ...options.headers, ...token_headers } };
    };

    const req = {
      delete: async (url, options = null) => {
        return request.delete(url, await MAGIC(options));
      },
      dispose: async (url, options = null) => {
        return request.dispose(url, await MAGIC(options));
      },
      fetch: async (url, options = null) => {
        return request.fetch(url, await MAGIC(options));
      },
      get: async (url, options = null) => {
        return request.get(url, await MAGIC(options));
      },
      head: async (url, options = null) => {
        return request.head(url, await MAGIC(options));
      },
      patch: async (url, options = null) => {
        return request.patch(url, await MAGIC(options));
      },
      post: async (url, options = null) => {
        return request.post(url, await MAGIC(options));
      },
      put: async (url, options = null) => {
        return request.put(url, await MAGIC(options));
      },
      // not related to http requests, so just pass forward
      storageState: request.storageState.bind(request),
    };

    use(req);
  },
});
