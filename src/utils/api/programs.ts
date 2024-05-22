import API_ENDPOINTS from "src/config/api";

export interface CreateProgramBody {
  entityId: number | string;
  name: string;
}

export interface Program {
  id: number | string;
  entityId: number | string;
  name: string;
}

export const getPrograms = async (
  access_token: string,
  entity_id: number
): Promise<Response> => {
  const params = new URLSearchParams();
  if (entity_id) params.append("entity_id", entity_id.toString());
  const url = `${API_ENDPOINTS.programs}?${params.toString()}`;

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
  entity_id: number,
  program_id: number
): Promise<Response> => {
  const params = new URLSearchParams();
  if (entity_id) params.append("entity_id", entity_id.toString());
  if (program_id) params.append("program_id", program_id.toString());

  const url = `${API_ENDPOINTS.program}?${params.toString()}`;

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
  entity_id: number,
  program_name: string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.program}`;

  const body = JSON.stringify({
    entityId: entity_id,
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
