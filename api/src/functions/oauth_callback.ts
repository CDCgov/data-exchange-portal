import {
  app,
  HttpRequest,
  HttpResponse,
  InvocationContext,
} from "@azure/functions";

export async function oauthCallback(
  context: InvocationContext,
  request: HttpRequest
): Promise<HttpResponse> {
  console.log(request.query);
  console.log(request.body);

  const authCode = request.query.get("code") || "Did not receive an auth code.";
  return { body: authCode };
}

app.http("oauth_callback", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: oauthCallback,
});
