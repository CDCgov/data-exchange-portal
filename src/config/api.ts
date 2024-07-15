import { getEnv } from "src/utils/helperFunctions/env";

const UPLOAD_URL = getEnv("VITE_UPLOAD_API_ENDPOINT");
const MMS_PREFIX = "mms";
const PS_API_PREFIX = "ps-api";

const API_ENDPOINTS = {
  // mms routes
  currentUserDatastreamRoutes: `api/${MMS_PREFIX}/current-user/datastreams-with-routes`,
  dataStreams: `api/${MMS_PREFIX}/datastreams`,
  entities: `api/${MMS_PREFIX}/entities`,
  groups: `api/${MMS_PREFIX}/groups`,
  identities: `api/${MMS_PREFIX}/identities`,
  dataStreamRouteGroups: `api/${MMS_PREFIX}/datastream-routes-groups`,
  // ps api routes
  fileSubmissions: `api/${PS_API_PREFIX}/file-submissions`,
  reportCounts: `api/${PS_API_PREFIX}/report-counts`,
  submissionDetails: `api/${PS_API_PREFIX}/submission-details`,
  // auth
  tokenCallback: `api/token`,
  // upload
  upload: UPLOAD_URL,
};

export default API_ENDPOINTS;
