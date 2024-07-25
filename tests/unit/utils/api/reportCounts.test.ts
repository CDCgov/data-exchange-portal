import getReportCounts from "src/utils/api/reportCounts";
import { generateCounts } from "src/mocks/data/reportCounts";
import mockSubmissions, {
  getSubmissions,
} from "src/mocks/data/fileSubmissions";

const earliestDate: string = new Date("2021-01-01T05:00:00Z").toISOString();
const currentDate: string = new Date().toISOString();

describe("reportCounts", () => {
  it("should fetch aims-csv counts", async () => {
    const payload = generateCounts(
      getSubmissions(
        mockSubmissions.aimsCsv,
        earliestDate,
        currentDate,
        "filename",
        "descending",
        1,
        150,
        "",
        ""
      )
    );
    const res = await getReportCounts("mock_auth_token", "aims-celr", "csv");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });

  it("should fetch daart-hl7 counts", async () => {
    const payload = generateCounts(
      getSubmissions(
        mockSubmissions.daartHl7,
        earliestDate,
        currentDate,
        "filename",
        "descending",
        1,
        150,
        "",
        ""
      )
    );
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
