import API_ENDPOINTS from "src/config/api";

export interface CreateAuthGroupBody {
  name: string;
  authgroup_id: string;
}

export interface AuthGroup {
  id: number;
  name: string;
}

export const getAuthGroups = async (
  access_token: string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.authGroups}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

export const createAuthGroups = async (
  access_token: string,
  authgroup_name: string,
  entity_id: string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.authGroups}`;

  const body = JSON.stringify({
    name: authgroup_name,
    entityId: entity_id,
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
