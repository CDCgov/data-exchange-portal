import API_ENDPOINTS from "src/config/api";

export interface CreateAuthGroupBody {
  name: string;
}

export interface CreateDatastreamRouteGroupBody {
  authgroupID: number;
  datastreamRouteID: number;
}

export interface CreateIdentityGroupBody {
  identityID: number;
}

export interface AuthGroup {
  id: number;
  name: string;
}

export const getAuthGroups = async (
  access_token: string,
  entity_id: string | number
): Promise<Response> => {
  const url = `${API_ENDPOINTS.entities}/${entity_id}/groups`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

// Todo: Determine actual body payload needed
export const createAuthGroup = async (
  access_token: string,
  entity_id: string | number,
  authgroup_name: string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.entities}/${entity_id}/groups`;

  const body = JSON.stringify({
    name: authgroup_name,
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

export const assignAuthGroupToDataStream = async (
  access_token: string,
  authgroup_id: number,
  route_id: number
): Promise<Response> => {
  const url = `${API_ENDPOINTS.dataStreamRouteGroups}`;

  const body = JSON.stringify({
    authgroupID: authgroup_id,
    datastreamRouteID: route_id,
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

export const assignUserToAuthGroup = async (
  access_token: string,
  identity_id: number,
  authgroup_id: number | string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.groups}/${authgroup_id}/identities`;

  const body = JSON.stringify({
    identityID: identity_id,
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
