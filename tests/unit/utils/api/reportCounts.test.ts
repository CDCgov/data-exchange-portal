import getReportCounts from "src/utils/api/reportCounts";
import mockReportCountsAimsAll from "src/mocks/data/reportCounts/reportCountsAimsAll.json";
import mockReportCountsAimsCsv from "src/mocks/data/reportCounts/reportCountsAimsCsv.json";
import mockReportCountsAimsHl7 from "src/mocks/data/reportCounts/reportCountsAimsHl7.json";
import mockReportCountsDaartHl7 from "src/mocks/data/reportCounts/reportCountsDaartHl7.json";

describe("reportCounts", () => {
  it("should fetch aims-csv counts", async () => {
    const payload = mockReportCountsAimsCsv;
    const res = await getReportCounts("mock_auth_token", "aims-celr", "csv");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });

  it("should fetch aims-hl7 counts", async () => {
    const payload = mockReportCountsAimsHl7;
    const res = await getReportCounts("mock_auth_token", "aims-celr", "hl7");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });

  it("should fetch aims-all counts", async () => {
    const payload = mockReportCountsAimsAll;
    const res = await getReportCounts("mock_auth_token", "aims-celr", "");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });

  it("should fetch daart-hl7 counts", async () => {
    const payload = mockReportCountsDaartHl7;
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
