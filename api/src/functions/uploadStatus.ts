import {
  app,
  HttpRequest,
  InvocationContext,
  HttpResponse,
  HttpResponseBody,
} from "@azure/functions";
import axios from "axios";

export async function uploadStatus(
  context: InvocationContext,
  request: HttpRequest
): Promise<HttpResponse> {
  // First, get auth token from headers.
  const authToken = request.headers.get("Authorization");

  if (!authToken) {
    context.error("Request did not contain auth token.");
    return {
      status: 403,
    };
  }

  // Next, get destination ID from path param.
  const destinationId = request.params.destinationId;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  const startDateISOString = startDate
    .toISOString()
    .replace(/[^a-zA-Z0-9]/g, "");

  // Then, send request to Supplemental API given destination ID.
  try {
    const statusResponse = await axios({
      url: `https://apidev.cdc.gov/status/destination/${destinationId}`, // TODO: make env var.
      method: "get",
      headers: { Authorization: authToken },
      params: {
        date_start: startDateISOString,
      },
    });

    return {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: statusResponse.data as HttpResponseBody,
    };
  } catch (error: unknown) {
    context.error(error);
    if (axios.isAxiosError(error)) {
      return { status: +error.code, body: error.message };
    }
    return { status: 500, body: error as HttpResponseBody };
  }
}

app.http("uploadStatus", {
  methods: ["GET"],
  authLevel: "function",
  route: "upload/status/{destinationId:alpha}",
  handler: uploadStatus,
});
