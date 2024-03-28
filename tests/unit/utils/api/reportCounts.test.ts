import getReportCounts from "src/utils/api/reportCounts";
import mockReportCounts from "src/mocks/data/reportCounts.json";

describe("reportCounts", () => {
  it("should fetch report counts", async () => {
    const payload = mockReportCounts;
    const res = await getReportCounts(
      "mock_auth_token",
      "mock_data_stream_id",
      "mock_data_stream_route"
    );
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });

  it("should return 400 without data_stream_id", async () => {
    const res = await getReportCounts(
      "mock_auth_token",
      "",
      "mock_data_stream_route"
    );
    expect(res.status).toStrictEqual(400);
  });

  it("should return 400 without data_stream_route", async () => {
    const res = await getReportCounts(
      "mock_auth_token",
      "mock_data_stream_id",
      ""
    );
    expect(res.status).toStrictEqual(400);
  });
});
