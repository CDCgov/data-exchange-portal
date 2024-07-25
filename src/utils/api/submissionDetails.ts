import API_ENDPOINTS from "src/config/api";

export enum SubmissionStatus {
  DELIVERED = "DELIVERED",
  FAILED = "FAILED",
  PROCESSING = "PROCESSING",
  UNKNOWN = "UNKNOWN",
}
export enum ReportStatus {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
}
export enum IssueLevel {
  ERROR = "ERROR",
  WARNING = "WARNING",
}

export interface ReportContent {
  messageUUID: string;
  messageHash: string;
  singleOrBatch: string;
  messageIndex: number;
}

export interface Issue {
  level: IssueLevel;
  message: string;
}

export interface Report {
  service: string;
  action: string;
  schemaName: string;
  schemaVersion: string;
  status: ReportStatus;
  timestamp: string;
  messageMetadata: ReportContent;
  issues: Issue[];
}

export interface SubmissionDetails {
  status: SubmissionStatus;
  lastService: string;
  lastAction: string;
  filename: string;
  uploadId: string;
  dexIngestTimestamp: string;
  dataStreamId: string;
  dataStreamRoute: string;
  jurisdiction: string;
  senderId: string;
  reports: Report[];
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
