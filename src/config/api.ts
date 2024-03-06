import { getEnv } from "../utils/helperFunctions/env";

const API_URL = getEnv("VITE_API_BASE_URL");

const API_ENDPOINTS = {
  fileSubmissions: `${API_URL}/fileSubmissions`,
};

export default API_ENDPOINTS;
