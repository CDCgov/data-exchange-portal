import {
  app,
  HttpRequest,
  HttpResponse,
  HttpResponseBody,
  InvocationContext,
} from "@azure/functions";
import axios from "axios";

export async function oauthCallback(
  context: InvocationContext,
  request: HttpRequest
): Promise<HttpResponse> {
  const authCode = request.query.get("code");

  if (!authCode) {
    context.error("Did not receive auth code from auth provider.");
    return {
      status: 400,
      body: "Did not receive auth code from auth provider.",
    };
  }

  const samsAuthReqBody = {
    grant_type: "authorization_code",
    code: authCode,
    client_id: process.env["SAMS_CLIENT_ID"],
    client_secret: process.env["SAMS_CLIENT_SECRET"],
    redirect_uri: process.env["SAMS_REDIRECT_URL"],
  };

  try {
    const authResponse = await axios({
      url: `${process.env["SAMS_URL"]}/auth/oauth/v2/token`,
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: samsAuthReqBody,
    });

    return {
      status: 301,
      headers: { Location: process.env["DEX_PORTAL_REDIRECT_URL"] },
      body: authResponse.data as HttpResponseBody,
    };
  } catch (error: unknown) {
    context.error(error);
    if (axios.isAxiosError(error)) {
      return { status: +error.code, body: error.message };
    }
    return { status: 500, body: error as HttpResponseBody };
  }
}

app.http("oauth_callback", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: oauthCallback,
});
