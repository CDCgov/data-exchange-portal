import { getEnv } from "src/utils/helperFunctions/env";

const API_URL = getEnv("VITE_API_BASE_URL");

const API_ENDPOINTS = {
  fileSubmissions: `${API_URL}/fileSubmissions`,
  tokenCallback: `${API_URL}/api/token`,
};

export default API_ENDPOINTS;
