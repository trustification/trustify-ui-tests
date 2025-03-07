import { createClient } from "@hey-api/client-axios";
import axios from "axios";

export const client = createClient({
  axios: axios,
  throwOnError: true,
});
