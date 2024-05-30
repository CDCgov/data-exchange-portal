import { getEnv } from "src/utils/helperFunctions/env";

const API_URL = getEnv("VITE_API_BASE_URL");
const MMS_PREFIX = "mms";
const PS_API_PREFIX = "ps-api";

const API_ENDPOINTS = {
  // mms routes
  currentUserDatastreamRoutes: `${API_URL}/${MMS_PREFIX}/current-user/datastreams-with-routes`,
  dataStreams: `${API_URL}/${MMS_PREFIX}/datastreams`,
  entities: `${API_URL}/${MMS_PREFIX}/entities`,
  identities: `${API_URL}/${MMS_PREFIX}/identities`, // TODO: get this once the namespace is final and merged to mms
  dataStreamRouteGroups: `${API_URL}/${MMS_PREFIX}/datastream-routes-groups`,
  // ps api routes
  fileSubmissions: `${API_URL}/${PS_API_PREFIX}/file-submissions`,
  reportCounts: `${API_URL}/${PS_API_PREFIX}/report-counts`,
  submissionDetails: `${API_URL}/${PS_API_PREFIX}/submission-details`,
  // auth
  tokenCallback: `${API_URL}/api/token`,
};

export default API_ENDPOINTS;
