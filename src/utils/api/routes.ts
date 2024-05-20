import API_ENDPOINTS from "src/config/api";

export interface CreateRouteBody {
  datastreamId: number | string;
  name: string;
}

export interface Route {
  id: number | string;
  datastreamId: number | string;
  name: string;
}

export const getRoutes = async (
  access_token: string,
  datastream_id: number
): Promise<Response> => {
  const params = new URLSearchParams();
  if (datastream_id) params.append("datastream_id", datastream_id.toString());
  const url = `${API_ENDPOINTS.routes}?${params.toString()}`;

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
  const params = new URLSearchParams();
  if (datastream_id) params.append("datastream_id", datastream_id.toString());
  if (route_id) params.append("route_id", route_id.toString());
  const url = `${API_ENDPOINTS.route}?${params.toString()}`;

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
  const url = `${API_ENDPOINTS.route}`;

  const body = JSON.stringify({
    datastreamId: datastream_id,
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