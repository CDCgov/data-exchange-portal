import { HttpRequest, InvocationContext } from "@azure/functions";
import { uploadStatus } from "../../src/functions/uploadStatus";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/node";
import { describe, beforeEach, test, expect, vi } from "vitest";

describe("/upload/status/{destinationId}", () => {
  let context: InvocationContext;
  let request: HttpRequest;

  beforeEach(() => {
    context = new InvocationContext({
      functionName: "uploadStatus",
      invocationId: "uploadStatusTestId",
      logHandler: vi.fn(),
    });
    request = new HttpRequest({
      url: "http://localhost",
      method: "GET",
      params: {
        destinationId: "test",
      },
    });
  });

  test("should return 403 Bad Request when no auth token provided in header", async () => {
    const response = await uploadStatus(context, request);
    expect(response.status).toBe(403);
  });

  test("should return empty array when no upload events found", async () => {
    // Init MSW request handlers.
    server.use(
      http.get(`${process.env["SUPPLEMENTAL_API_URL"]}/destination/*`, () => {
        return HttpResponse.json([]);
      })
    );

    // Create dummy auth token.
    request.headers.set("Authorization", "12345");

    const response = await uploadStatus(context, request);
    expect(response.status).toBe(200);
  });
});
