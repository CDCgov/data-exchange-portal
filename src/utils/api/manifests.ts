import API_ENDPOINTS from "src/config/api";

export interface CreateManifestBody {
  datastreamId: number | string;
  routeId: number | string;
  manifestJson: string;
}

export interface Manifest {
  id: number | string;
  datastreamId: number | string;
  routeId: number | string;
  manifestJson: string;
}

export const getManifests = async (
  access_token: string,
  datastream_id: number,
  route_id: number
): Promise<Response> => {
  const params = new URLSearchParams();
  if (datastream_id) params.append("datastream_id", datastream_id.toString());
  if (route_id) params.append("route_id", route_id.toString());
  const url = `${API_ENDPOINTS.manifests}?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

export const getManifest = async (
  access_token: string,
  datastream_id: number,
  route_id: number,
  manifest_id: number
): Promise<Response> => {
  const params = new URLSearchParams();
  if (datastream_id) params.append("datastream_id", datastream_id.toString());
  if (route_id) params.append("route_id", route_id.toString());
  if (manifest_id) params.append("manifest_id", manifest_id.toString());
  const url = `${API_ENDPOINTS.manifest}?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

export const createManifest = async (
  access_token: string,
  datastream_id: number,
  route_id: number,
  manifest_json: string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.manifest}`;

  const body = JSON.stringify({
    datastreamId: datastream_id,
    routeId: route_id,
    manifestJson: manifest_json,
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
