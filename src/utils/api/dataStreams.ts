import API_ENDPOINTS from "src/config/api";

export interface DataStream {
  id: number | string;
  dataStreamId: string;
  routes: string[];
}

const getDataStreams = async (access_token: string): Promise<Response> => {
  const url = `${API_ENDPOINTS.dataStreams}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

export default getDataStreams;
