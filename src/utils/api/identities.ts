import API_ENDPOINTS from "src/config/api";

export interface CreateIdentityBody {
  idpClientID: string;
}

export interface Identity {
  id: number;
  idpClientID: string;
}

export const getIdentities = async (
  access_token: string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.identities}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

export const createIdentity = async (
  access_token: string,
  client_id: string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.identities}`;

  const body = JSON.stringify({
    idpClientID: client_id,
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

export const getIdentityDatastreamsAndRoutes = async (
  access_token: string,
  identity_id: number | string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.identities}/${identity_id}/datastreams-with-routes`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};
