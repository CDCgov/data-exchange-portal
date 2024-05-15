import API_ENDPOINTS from "src/config/api";

export interface ValidationReport {
  line: number;
  column: number;
  path: string;
  description: string;
  category: string;
  classification: string;
}

export interface SubmissionInfo {
  status: string;
  stage_name: string;
  file_name: string;
  file_size_bytes: number;
  bytes_uploaded: number;
  upload_id: string;
  uploaded_by: string;
  timestamp: string;
  data_stream_id: string;
  data_stream_route: string;
}

export interface SubmissionDetails {
  info: SubmissionInfo;
  issues: string[];
  reports: ValidationReport[];
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
