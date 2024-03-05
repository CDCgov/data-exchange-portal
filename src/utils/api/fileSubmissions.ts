import API_ENDPOINTS from "src/config/api";

export const getFileSubmissions = async (): Promise<Response> => {
  const response = await fetch(`${API_ENDPOINTS.fileSubmissions}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch();

  return response;
};

export default getFileSubmissions;
