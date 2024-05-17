import { getEnv } from "src/utils/helperFunctions/env";

const API_URL = getEnv("VITE_API_BASE_URL");

const API_ENDPOINTS = {
  // mms routes
  dataStream: `${API_URL}/dataStream`,
  dataStreams: `${API_URL}/dataStreams`,
  entity: `${API_URL}/entity`,
  entities: `${API_URL}/entities`,
  manifest: `${API_URL}/manifest`,
  manifests: `${API_URL}/manifests`,
  program: `${API_URL}/program`,
  programs: `${API_URL}/programs`,
  route: `${API_URL}/route`,
  routes: `${API_URL}/routes`,
  // ps api routes
  fileSubmissions: `${API_URL}/fileSubmissions`,
  reportCounts: `${API_URL}/reportCounts`,
  submissionDetails: `${API_URL}/submissionDetails`,
  // auth
  tokenCallback: `${API_URL}/api/token`,
};

export default API_ENDPOINTS;
