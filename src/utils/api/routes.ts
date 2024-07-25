import API_ENDPOINTS from "src/config/api";

export interface CreateRouteBody {
  dataStreamID: number;
  name: string;
}

export interface Route {
  id?: number;
  dataStreamID: number;
  name: string;
}

export interface RouteWithPermissions extends Route {
  writePermissions?: boolean;
}

export const getRoutes = async (
  access_token: string,
  datastream_id: number | string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.dataStreams}/${datastream_id}/routes`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

export const getRoute = async (
  access_token: string,
  datastream_id: number,
  route_id: number
): Promise<Response> => {
  const url = `${API_ENDPOINTS.dataStreams}/${datastream_id}/routes/${route_id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

export const createRoute = async (
  access_token: string,
  datastream_id: number,
  route_name: string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.dataStreams}/${datastream_id}/routes`;

  const body = JSON.stringify({
    name: route_name,
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
