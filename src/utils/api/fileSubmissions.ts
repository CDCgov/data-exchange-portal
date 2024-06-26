/* eslint-disable @typescript-eslint/no-explicit-any */
import API_ENDPOINTS from "src/config/api";

export interface FileSubmissionsSummary {
  page_number: number;
  number_of_pages: number;
  page_size: number;
  total_items: number;
}

export interface FileSubmission {
  status: string;
  filename: string;
  upload_id: string;
  timestamp: string;
  jurisdiction: string;
  sender: string;
  metadata?: any;
  issues?: string[];
}

export interface FileSubmissions {
  summary: FileSubmissionsSummary;
  items: FileSubmission[];
}

export const defaultSubmissionSummary: FileSubmissionsSummary = {
  page_number: 1,
  number_of_pages: 0,
  page_size: 10,
  total_items: 0,
};

export const defaultSubmissionItem: FileSubmission = {
  upload_id: "",
  filename: "",
  status: "",
  jurisdiction: "",
  sender: "",
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
