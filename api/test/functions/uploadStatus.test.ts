import { HttpRequest, InvocationContext } from "@azure/functions";
import { uploadStatus } from "../../src/functions/uploadStatus";

describe("/upload/status/{destinationId}", () => {
  let context: InvocationContext;
  let request: HttpRequest;

  beforeEach(() => {
    context = new InvocationContext({
      functionName: "uploadStatus",
      invocationId: "uploadStatusTestId",
      logHandler: jest.fn(),
    });
    request = new HttpRequest({
      url: "http://localhost",
      method: "GET",
    });
  });

  test("should return 403 Bad Request when no auth token provided in header", async () => {
    const response = await uploadStatus(context, request);
    expect(response.status).toBe(403);
  });
});
