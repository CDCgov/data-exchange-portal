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
  console.log(request.body);

  const name = request.query.get("name") || (await request.text()) || "world";

  return { body: `Hello, ${name}!` };
}

app.http("oauth_callback", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: oauthCallback,
});
