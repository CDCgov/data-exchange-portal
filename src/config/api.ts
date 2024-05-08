import { getEnv } from "src/utils/helperFunctions/env";

const API_URL = getEnv("VITE_API_BASE_URL");

const API_ENDPOINTS = {
  dataStreams: `${API_URL}/dataStreams`,
  fileSubmissions: `${API_URL}/fileSubmissions`,
  reportCounts: `${API_URL}/reportCounts`,
  submissionDetails: `${API_URL}/submissionDetails`,
  tokenCallback: `${API_URL}/api/token`,
};

export default API_ENDPOINTS;
