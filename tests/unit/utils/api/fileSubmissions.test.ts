import { getFileSubmissions } from "src/utils/api/fileSubmissions";
import mockSubmissions, {
  getSubmissions,
} from "src/mocks/data/fileSubmissions";

const earliestDate: string = new Date("2021-01-01T05:00:00Z").toISOString();
const currentDate: string = new Date().toISOString();

describe("fileSubmissions", () => {
  it("should fetch aims-csv file submissions", async () => {
    const payload = getSubmissions(
      mockSubmissions.aimsCsv,
      earliestDate,
      currentDate,
      "timestamp",
      "ascending",
      1,
      10,
      "",
      ""
    );
    const res = await getFileSubmissions(
      "mock_auth_token",
      "aims-celr",
      "csv",
      earliestDate,
      "",
      "timestamp",
      "ascending",
      1,
      10,
      "",
      ""
    );
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });

  it("should fetch daart file submissions", async () => {
    const payload = getSubmissions(
      mockSubmissions.daartHl7,
      earliestDate,
      currentDate,
      "timestamp",
      "ascending",
      1,
      10,
      "",
      ""
    );
    const res = await getFileSubmissions(
      "mock_auth_token",
      "daart",
      "hl7",
      earliestDate,
      "",
      "timestamp",
      "ascending",
      1,
      10
    );
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });

  it("should return 400 without data_stream_id", async () => {
    const res = await getFileSubmissions("mock_auth_token", "");
    expect(res.status).toStrictEqual(400);
  });
});
