import { test as base } from "@playwright/test";
import axios, { AxiosStatic } from "axios";

let access_token = "";

type TokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
};

const getToken = async () => {
  const oidcConfigResponse = await axios.get(
    `${process.env.TRUSTIFY_AUTH_URL ?? "http://localhost:9090/realms/trustd"}/.well-known/openid-configuration`
  );
  const tokenServiceURL = oidcConfigResponse.data["token_endpoint"];

  const data = new URLSearchParams();
  data.append("grant_type", "client_credentials");
  data.append("client_id", process.env.TRUSTIFY_AUTH_CLIENT_ID ?? "cli");
  data.append(
    "client_secret",
    process.env.TRUSTIFY_AUTH_CLIENT_SECRET ?? "secret"
  );

  return await axios.post<TokenResponse>(tokenServiceURL, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

// Declare the types of your fixtures.
type ApiClientFixture = {
  axios: AxiosStatic;
};

export const test = base.extend<ApiClientFixture>({
  axios: async ({ baseURL }, use) => {
    axios.defaults.baseURL = baseURL;

    if (process.env.TRUSTIFY_AUTH_ENABLED === "true") {
      const { data: tokenResponse } = await getToken();
      access_token = tokenResponse.access_token;

      // Intercept Requests
      axios.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${access_token}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      // Intercept Responses
      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        async (error) => {
          if (error.response && error.response.status === 401) {
            const { data: refreshedTokenResponse } = await getToken();
            access_token = refreshedTokenResponse.access_token;

            const retryCounter = error.config.retryCounter || 1;
            const retryConfig = {
              ...error.config,
              headers: {
                ...error.config.headers,
                Authorization: `Bearer ${access_token}`,
              },
            };

            // Retry limited times
            if (retryCounter < 2) {
              return axios({
                ...retryConfig,
                retryCounter: retryCounter + 1,
              });
            }
          }

          return Promise.reject(error);
        }
      );
    }

    await use(axios);
  },
});

export { expect } from "@playwright/test";
