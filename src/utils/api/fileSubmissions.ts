/* eslint-disable @typescript-eslint/no-explicit-any */
import API_ENDPOINTS from "src/config/api";
import { SubmissionStatus } from "src/utils/api/submissionDetails";

export interface FileSubmissionsSummary {
  pageNumber: number;
  numberOfPages: number;
  pageSize: number;
  totalItems: number;
  jurisdictions: string[];
  senderIds: string[];
}

export interface FileSubmission {
  status: SubmissionStatus;
  filename: string;
  upload_id: string;
  timestamp: string;
  jurisdiction: string;
  sender_id: string;
  metadata?: any;
  issues?: string[];
  file_size_bytes?: number;
}

export interface FileSubmissions {
  summary: FileSubmissionsSummary;
  items: FileSubmission[];
}

export const defaultSubmissionSummary: FileSubmissionsSummary = {
  pageNumber: 1,
  numberOfPages: 0,
  pageSize: 10,
  totalItems: 0,
  jurisdictions: [],
  senderIds: [],
};

export const defaultSubmissionItem: FileSubmission = {
  upload_id: "",
  filename: "",
  status: SubmissionStatus.UNKNOWN,
  jurisdiction: "",
  sender_id: "",
  timestamp: "",
  metadata: {},
};

export const getFileSubmissions = async (
  access_token: string,
  data_stream_id: string,
  data_stream_route?: string,
  date_start?: string,
  date_end?: string,
  sort_by?: string,
  sort_order?: string,
  page_number?: number,
  page_size?: number,
  jurisdiction?: string,
  senderId?: string
): Promise<Response> => {
  const params = new URLSearchParams();

  if (data_stream_id) params.append("data_stream_id", data_stream_id);
  if (data_stream_route) params.append("data_stream_route", data_stream_route);
  if (date_start) params.append("date_start", date_start);
  if (date_end) params.append("date_end", date_end);
  if (sort_by) params.append("sort_by", sort_by);
  if (sort_order) params.append("sort_order", sort_order);
  if (page_size) params.append("page_size", page_size.toString());
  if (page_number) params.append("page_number", page_number.toString());
  if (jurisdiction) params.append("jurisdiction", jurisdiction);
  if (senderId) params.append("sender_id", senderId);

  const url = `${API_ENDPOINTS.fileSubmissions}?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};
