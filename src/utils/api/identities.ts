import API_ENDPOINTS from "src/config/api";

export interface Identity {
  id: number;
  name: string; // Is this the SAMS ID?
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
