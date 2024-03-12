import API_ENDPOINTS from "src/config/api";

export const getFileSubmissions = async (
  access_token: string,
  data_stream_id: string,
  date_start?: string,
  page_number?: number
): Promise<Response> => {
  const params = new URLSearchParams();

  if (data_stream_id) params.append("data_stream_id", data_stream_id);
  if (date_start) params.append("date_start", date_start);
  if (page_number) params.append("page_number", page_number.toString());

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
