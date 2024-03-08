import API_ENDPOINTS from "../../config/api";

export const getFileSubmissions = async (
  access_token?: string,
  data_stream_id?: string,
  date_start?: string,
  page_number?: number
): Promise<Response> => {
  const response = await fetch(
    `${API_ENDPOINTS.fileSubmissions}?data_stream_id=${data_stream_id}&date_start=${date_start}&page_number=${page_number}`,
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
