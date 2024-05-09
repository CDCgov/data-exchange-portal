import { getFileSubmissions } from "src/utils/api/fileSubmissions";
import mockSubmissions from "src/mocks/data/fileSubmissions";

describe("fileSubmissions", () => {
  it("should fetch aims-csv file submissions", async () => {
    const payload = mockSubmissions.aimsCsv;
    const res = await getFileSubmissions("mock_auth_token", "aims-celr", "csv");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });

  it("should fetch aims-hl7 file submissions", async () => {
    const payload = mockSubmissions.aimsHl7;
    const res = await getFileSubmissions("mock_auth_token", "aims-celr", "hl7");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });

  it("should fetch aims-csv file submissions", async () => {
    const payload = mockSubmissions.aimsAll;
    const res = await getFileSubmissions("mock_auth_token", "aims-celr", "");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });

  it("should fetch aims-csv file submissions", async () => {
    const payload = mockSubmissions.daartHl7;
    const res = await getFileSubmissions("mock_auth_token", "daart", "hl7");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });

  it("should return 400 without data_stream_id", async () => {
    const res = await getFileSubmissions("mock_auth_token", "");
    expect(res.status).toStrictEqual(400);
  });
});
