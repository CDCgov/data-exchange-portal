import { getFileSubmissions } from "src/utils/api/fileSubmissions";
import mockFileSubmissions from "src/mocks/data/fileSubmissions.json";

describe("fileSubmissions", () => {
  it("should fetch file submissions", async () => {
    const payload = mockFileSubmissions;
    const res = await getFileSubmissions(
      "mock_auth_token",
      "mock_data_stream_id"
    );
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });

  it("should return 400 without data_stream_id", async () => {
    const res = await getFileSubmissions("mock_auth_token", "");
    expect(res.status).toStrictEqual(400);
  });
});
