import API_ENDPOINTS from "src/config/api";

const getDataStreams = async (access_token: string): Promise<Response> => {
  const params = new URLSearchParams();

  const url = `${API_ENDPOINTS.dataStreams}?${params.toString()}`;

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
