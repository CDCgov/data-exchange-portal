import API_ENDPOINTS from "src/config/api";

export interface CreateEntityBody {
  name: string;
}

export interface Entity {
  id: number;
  name: string;
}

export const getEntities = async (access_token: string): Promise<Response> => {
  const url = `${API_ENDPOINTS.entities}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

export const getEntity = async (
  access_token: string,
  entity_id: number | string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.entities}/${entity_id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

export const createEntity = async (
  access_token: string,
  entity_name: string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.entities}`;

  const body = JSON.stringify({
    name: entity_name,
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
