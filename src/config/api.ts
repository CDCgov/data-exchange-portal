import { getEnv } from "src/utils/helperFunctions/env";

const API_URL = getEnv("VITE_API_BASE_URL");
const UPLOAD_URL = getEnv("VITE_UPLOAD_API_ENDPOINT");
const MMS_PREFIX = "mms";
const PS_API_PREFIX = "ps-api";

const API_ENDPOINTS = {
  // mms routes
  dataStreams: `${API_URL}/api/${MMS_PREFIX}/datastreams`,
  entities: `${API_URL}/api/${MMS_PREFIX}/entities`,
  groups: `${API_URL}/api/${MMS_PREFIX}/groups`,
  identities: `${API_URL}/api/${MMS_PREFIX}/identities`,
  dataStreamRouteGroups: `${API_URL}/api/${MMS_PREFIX}/datastream-routes-groups`,
  // ps api routes
  fileSubmissions: `${API_URL}/api/${PS_API_PREFIX}/file-submissions`,
  reportCounts: `${API_URL}/api/${PS_API_PREFIX}/report-counts`,
  submissionDetails: `${API_URL}/api/${PS_API_PREFIX}/submission-details`,
  // auth
  tokenCallback: `${API_URL}/api/token`,
  // upload
  upload: UPLOAD_URL,
};

export default API_ENDPOINTS;
