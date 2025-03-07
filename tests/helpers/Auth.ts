import { Page, APIRequestContext, expect } from "@playwright/test";

// minimal remaining validity before acquiring new token
const TOKEN_MIN_VALIDITY = 3000; // msec

export const login = async (page: Page) => {
  let shouldLogin = process.env.TRUSTIFY_AUTH_ENABLED;

  if (shouldLogin === "true") {
    let userName = process.env.TRUSTIFY_AUTH_USER ?? "admin";
    let userPassword = process.env.TRUSTIFY_AUTH_PASSWORD ?? "admin";

    await page.goto("/");

    await page.fill('input[name="username"]:visible', userName);
    await page.fill('input[name="password"]:visible', userPassword);
    await page.keyboard.press("Enter");

    await page.waitForSelector("text=Your Dashboard"); // Ensure login was successful
  }
};

export const get_token_endpoint = async (request: APIRequestContext) => {
  if (process.env.__TOKEN_ENDPOINT) {
    return process.env.__TOKEN_ENDPOINT;
  }

  // fetch trustify index page source
  const indexPage = await request.get(process.env.TRUSTIFY_URL, {
    maxRedirects: 0,
  });
  const indexSource = await indexPage.text();
  // extract encoded env config
  const matchIndexJwt = indexSource.match(/window._env="([^"]+)"/);
  expect(matchIndexJwt, "page has env info about oidc server").toBeTruthy();
  // decode to json and obtain oidc server url
  const envInfo = JSON.parse(atob(matchIndexJwt[1]));
  console.log("env info: " + envInfo); // FIXME: DEBUG
  expect(envInfo).toHaveProperty("OIDC_SERVER_URL");
  const oidcURL = envInfo["OIDC_SERVER_URL"];

  console.log("oidc url: " + oidcURL); // FIXME: DEBUG

  // fetch openid config to obtain token endpoint
  const openidURL = oidcURL + "/.well-known/openid-configuration";
  const openidConfResp = await request.get(openidURL);
  expect(openidConfResp).toBeOK();
  const openidConf = await openidConfResp.json();
  expect(openidConf).toHaveProperty("token_endpoint");

  process.env.__TOKEN_ENDPOINT = openidConf["token_endpoint"];

  console.log("token endpoint: " + openidConf["token_endpoint"]); // FIXME: DEBUG
  return openidConf["token_endpoint"];
};

export const get_token = async (request: APIRequestContext) => {
  if (process.env.TRUSTIFY_AUTH_ENABLED !== "true") {
    return;
  }

  if (process.env.__TOKEN) {
    // console.log('Expiring at:', Number(process.env.__TOKEN_EXPIRES_AT));
    // console.log('Now + min-valid:', Date.now() + TOKEN_MIN_VALIDITY);
    // console.log('Still valid:', (Date.now() + TOKEN_MIN_VALIDITY) < Number(process.env.__TOKEN_EXPIRES_AT));

    if (
      Date.now() + TOKEN_MIN_VALIDITY <
      Number(process.env.__TOKEN_EXPIRES_AT)
    ) {
      return process.env.__TOKEN;
    } else {
      // console.log('Auth: need to refresh token');
    }
  }

  const clientId = process.env.TRUSTIFY_AUTH_CLI_ID ?? "cli";
  const clientSecret = process.env.TRUSTIFY_AUTH_CLI_SECRET;

  let tokenEndpoint = await get_token_endpoint(request);

  const authStr = "Basic " + btoa(clientId + ":" + clientSecret);
  const tokenResp = await request.post(tokenEndpoint, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authStr,
    },
    form: {
      grant_type: "client_credentials",
    },
  });
  expect(tokenResp).toBeOK();
  const tokenJson = await tokenResp.json();
  expect(tokenJson).toHaveProperty("access_token");
  expect(tokenJson).toHaveProperty("expires_in");

  const token = tokenJson.access_token;
  // deduce 1 sec from token expiration (hopefully account for delay or token endpoint response ... yep usage of relative expiration sucks)
  // multiply by thousand to get milisec from sec
  // record future Date when it should expire
  // (we will want auto-refresh)
  const expires_at = Date.now() + Number(tokenJson.expires_in) * 1000;

  process.env.__TOKEN = token;
  process.env.__TOKEN_EXPIRES_AT = expires_at;

  console.log(`got fresh token: ${token.slice(0, 5)}...${token.slice(-5)}`); // FIXME: DEBUG

  return token;
};

export const get_token_header = async (request: APIRequestContext) => {
  const token = await get_token(request);
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  } else {
    return {};
  }
};
