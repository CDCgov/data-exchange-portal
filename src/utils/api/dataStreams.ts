import API_ENDPOINTS from "src/config/api";
import { Route } from "src/utils/api/routes";

export interface CreateDataStreamBody {
  name: string;
  programID: number | string;
}

export interface DataStream {
  id: number;
  programID: number;
  serviceLineID?: number;
  name: string;
}

export interface DataStreamWithRoutes extends DataStream {
  routes: Route[];
}

export const getDataStreamsAndRoutes = async (
  access_token: string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.dataStreamsAndRoutes}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

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
  datastream_id: number
): Promise<Response> => {
  const url = `${API_ENDPOINTS.dataStreams}/${datastream_id}`;

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
  const url = `${API_ENDPOINTS.dataStreams}`;

  const body = JSON.stringify({
    name: data_stream_name,
    programID: program_id,
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
