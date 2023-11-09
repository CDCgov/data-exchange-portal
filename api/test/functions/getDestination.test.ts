import { HttpRequest, InvocationContext } from "@azure/functions";
import { getDestination } from "../../src/functions/getDestination";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/node";
import { describe, beforeEach, test, expect, vi } from "vitest";

describe("Route: GET Destination ID", () => {
  const endpoint = `${process.env["SUPPLEMENTAL_API_URL"]}/destination`;
  let context: InvocationContext;
  let request: HttpRequest;

  beforeEach(() => {
    context = new InvocationContext({
      functionName: "getDestination",
      invocationId: "getDestinationTestId",
      logHandler: vi.fn(),
    });

    request = new HttpRequest({
      url: "http://localhost",
      method: "GET",
    });
  });

  describe("Non-Auth: GET /api/upload/destination", () => {
    test("should return 403 Bad Request when no auth token provided in header", async () => {
      const response = await getDestination(context, request);
      expect(response.status).toBe(403);
    });

    test("should return unauthorized if supplemental API returns unauthorized", async () => {
      server.use(
        http.get(endpoint, () => {
          return new HttpResponse(null, {
            status: 401,
            statusText: "Unauthorized",
          });
        })
      );

      // Create dummy auth token.
      request.headers.set("Authorization", "12345");

      const response = await getDestination(context, request);
      expect(response.status).toBe(401);
    });
  });

  describe("Auth: GET /api/upload/destination", () => {
    test("should return empty array when no upload events found", async () => {
      // Init MSW request handlers.
      server.use(
        http.get(endpoint, () => {
          return HttpResponse.json([]);
        })
      );

      // Create dummy auth token.
      request.headers.set("Authorization", "12345");

      const response = await getDestination(context, request);
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(0);
    });

    test("should return 200 if authenticated", async () => {
      server.use(
        http.get(endpoint, () => {
          return HttpResponse.json([]);
        })
      );

      request.headers.set("Authorization", "12345");

      const response = await getDestination(context, request);
      expect(response.status).toBe(200);
    });

    test("should fetch a mocked response with 3 destinations", async () => {
      server.use(
        http.get(endpoint, () => {
          return HttpResponse.json([
            { destinationID: "dextesting" },
            { destinationID: "abc" },
            { destinationID: "123" },
          ]);
        })
      );
      request.headers.set("Authorization", "12345");

      const response = await getDestination(context, request);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(3);
    });
  });
});
