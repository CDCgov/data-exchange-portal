import API_ENDPOINTS from "src/config/api";

export interface CreateDataStreamBody {
  name: string;
  programId: number | string;
}

export interface DataStream {
  id: number | string;
  name: string;
  programId: number | string;
  routes: string[];
}

export const getDataStreams = async (
  access_token: string
): Promise<Response> => {
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

export const getDataStream = async (
  access_token: string,
  data_stream_id: number
): Promise<Response> => {
  const url = `${API_ENDPOINTS.dataStream}?data_stream_id=${data_stream_id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

export const createDataStream = async (
  access_token: string,
  data_stream_name: string,
  program_id: number
): Promise<Response> => {
  const url = `${API_ENDPOINTS.dataStream}`;

  const body = JSON.stringify({
    name: data_stream_name,
    programId: program_id,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    body,
  }).catch();

  return response;
};
