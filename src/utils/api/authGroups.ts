import API_ENDPOINTS from "src/config/api";

export interface CreateAuthGroupBody {
  name: string;
}

export interface AuthGroup {
  id: number;
  name: string;
}

export const getAuthGroups = async (
  access_token: string,
  entity_id: string
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
  entity_id: string,
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
