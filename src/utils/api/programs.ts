import API_ENDPOINTS from "src/config/api";

export interface CreateProgramBody {
  name: string;
}

export interface Program {
  id: number | string;
  name: string;
  entityId?: number | string;
}

export const getPrograms = async (
  access_token: string,
  entity_id: number | string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.entities}/${entity_id}/programs`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

export const getProgram = async (
  access_token: string,
  entity_id: number | string,
  program_id: number | string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.entities}/${entity_id}/programs/${program_id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

export const createProgram = async (
  access_token: string,
  entity_id: number | string,
  program_name: string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.entities}/${entity_id}/programs`;

  const body = JSON.stringify({
    name: program_name,
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
