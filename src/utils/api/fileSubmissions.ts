import API_ENDPOINTS from "src/config/api";

export const getFileSubmissions = async (
  access_token: string,
  data_stream_id: string,
  date_start?: string,
  date_end?: string,
  sort_by?: string,
  sort_order?: string,
  page_number?: number,
  page_size?: number
): Promise<Response> => {
  const response = await fetch(
    `${API_ENDPOINTS.fileSubmissions}?data_stream_id=${data_stream_id}&page_size=${page_size}&date_start=${date_start}&date_end=${date_end}&sort_by=${sort_by}&sort_order=${sort_order}&page_number=${page_number}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    }
  ).catch();

  return response;
};

export default getFileSubmissions;
