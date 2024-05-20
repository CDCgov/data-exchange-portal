import {
  getDataStreams,
  getDataStream,
  createDataStream,
} from "src/utils/api/dataStreams";
import mockDataStreams from "src/mocks/data/dataStreams";

describe("dataStreams", () => {
  it("should fetch data streams", async () => {
    const payload = mockDataStreams;
    const res = await getDataStreams("mock_auth_token");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});

describe("dataStream", () => {
  it("should fetch a particular data stream", async () => {
    const payload = mockDataStreams[0];
    const res = await getDataStream("mock_auth_token", 1);

    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
  it("should return new data stream", async () => {
    const name = "test_name";
    const programId = 1;
    const payload = { id: 1, name, programId };
    const res = await createDataStream("mock_auth_token", name, 1);
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});
