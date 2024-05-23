import { getEnv } from "src/utils/helperFunctions/env";

const API_URL = getEnv("VITE_API_BASE_URL");
const MMS_PREFIX = "mms";
const PS_API_PREFIX = "ps-api";

const API_ENDPOINTS = {
  // mms routes
  dataStream: `${API_URL}/${MMS_PREFIX}/dataStream`,
  dataStreams: `${API_URL}/${MMS_PREFIX}/dataStreams`,
  entities: `${API_URL}/${MMS_PREFIX}/entities`,
  manifest: `${API_URL}/${MMS_PREFIX}/manifest`,
  manifests: `${API_URL}/${MMS_PREFIX}/manifests`,
  program: `${API_URL}/${MMS_PREFIX}/program`,
  programs: `${API_URL}/${MMS_PREFIX}/programs`,
  route: `${API_URL}/${MMS_PREFIX}/route`,
  routes: `${API_URL}/${MMS_PREFIX}/routes`,
  // ps api routes
  fileSubmissions: `${API_URL}/${PS_API_PREFIX}/file-submissions`,
  reportCounts: `${API_URL}/${PS_API_PREFIX}/report-counts`,
  submissionDetails: `${API_URL}/${PS_API_PREFIX}/submission-details`,
  // auth
  tokenCallback: `${API_URL}/api/token`,
};

export default API_ENDPOINTS;
