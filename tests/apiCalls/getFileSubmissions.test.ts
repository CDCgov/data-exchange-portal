import { getFileSubmissions } from "../../src/utils/api/fileSubmissions";
import { mockFileSubmissions } from "../../src/mocks/data/fileStatus";

describe("getFileSubmissions", () => {
  it("should fetch file submissions", async () => {
    const payload = mockFileSubmissions;
    const res = await getFileSubmissions();
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});
