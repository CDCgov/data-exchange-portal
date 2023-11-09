import {
  HttpRequest,
  InvocationContext,
  HttpResponse,
  HttpResponseBody,
} from "@azure/functions";
import axios from "axios";

export async function getDestination(
  context: InvocationContext,
  request: HttpRequest
): Promise<HttpResponse> {
  const endpoint = `${process.env["SUPPLEMENTAL_API_URL"]}/destination`;
  const authToken = request.headers.get("Authorization");

  if (!authToken) {
    context.error("Request did not contain auth token.");
    return {
      status: 403,
    };
  }

  try {
    const statusResponse = await axios({
      url: endpoint,
      method: "get",
      headers: { Authorization: authToken },
      params: request.query,
    });

    return {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: statusResponse.data as HttpResponseBody,
    };
  } catch (error: unknown) {
    context.error(error);
    if (axios.isAxiosError(error)) {
      return { status: error.response.status, body: error.message };
    }
    return { status: 500, body: error as HttpResponseBody };
  }
}
