import getDataStreams from "src/utils/api/dataStreams";
import mockDataStreams from "src/mocks/data/dataStreams.json";

describe("dataStreams", () => {
  it("should fetch data streams", async () => {
    const payload = mockDataStreams;
    const res = await getDataStreams("mock_auth_token");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});
