import API_ENDPOINTS from "src/config/api";

export const getSubmissionDetails = async (
  access_token: string,
  upload_id: string
): Promise<Response> => {
  const params = new URLSearchParams();

  if (upload_id) params.append("upload_id", upload_id);

  const url = `${API_ENDPOINTS.submissionDetails}?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

export default getSubmissionDetails;
