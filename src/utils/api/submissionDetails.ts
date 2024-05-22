import API_ENDPOINTS from "src/config/api";

export interface ReportError {
  type: string;
  stage: string;
  action: string;
  level: string;
  message: string;
  details?: any;
}

export interface Report {
  stage: string;
  action: string;
  schema_name: string;
  version: string;
  data_stream_id: string;
  data_stream_route: string;
  jurisdiction: string;
  transport_id: string;
  parent_id: string;
  message_id: string;
  type: string;
  timestamp_complete: string;
  message: string;
  errors: ReportError[];
  routing_metadata?: any;
  data?: any;
}

export interface SubmissionDetails {
  status: string;
  current_stage: string;
  current_action: string;
  file_name: string;
  transport_id: string;
  timestamp: string;
  data_stream_id: string;
  data_stream_route: string;
  reports: Report[];
  meta?: any;
}

export const getSubmissionDetails = async (
  access_token: string,
  upload_id: string
): Promise<Response> => {
  const params = new URLSearchParams();

  if (upload_id) params.append("upload_id", upload_id);

  const url = `${API_ENDPOINTS.submissionDetails}?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

export default getSubmissionDetails;
