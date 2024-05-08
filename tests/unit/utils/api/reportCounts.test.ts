import getReportCounts from "src/utils/api/reportCounts";
import mockCounts from "src/mocks/data/reportCounts";

describe("reportCounts", () => {
  it("should fetch aims-csv counts", async () => {
    const payload = mockCounts.aimsCsv;
    const res = await getReportCounts("mock_auth_token", "aims-celr", "csv");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });

  it("should fetch aims-hl7 counts", async () => {
    const payload = mockCounts.aimsHl7;
    const res = await getReportCounts("mock_auth_token", "aims-celr", "hl7");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });

  it("should fetch aims-all counts", async () => {
    const payload = mockCounts.aimsAll;
    const res = await getReportCounts("mock_auth_token", "aims-celr", "");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });

  it("should fetch daart-hl7 counts", async () => {
    const payload = mockCounts.daartHl7;
    const res = await getReportCounts("mock_auth_token", "daart", "hl7");
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
});
