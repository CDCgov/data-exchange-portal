import API_ENDPOINTS from "src/config/api";

export const getReportCounts = async (
  access_token: string,
  data_stream_id?: string,
  data_stream_route?: string,
  date_start?: string,
  date_end?: string
): Promise<Response> => {
  const params = new URLSearchParams();

  if (data_stream_id) params.append("data_stream_id", data_stream_id);
  if (data_stream_route) params.append("data_stream_route", data_stream_route);
  if (date_start) params.append("date_start", date_start);
  if (date_end) params.append("date_end", date_end);

  const url = `${API_ENDPOINTS.reportCounts}?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

export default getReportCounts;
