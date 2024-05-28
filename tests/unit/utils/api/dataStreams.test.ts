import {
  DataStream,
  getDataStreams,
  getDataStream,
  getDataStreamsAndRoutes,
  createDataStream,
} from "src/utils/api/dataStreams";
import {
  mockDataStreams,
  mockDataStreamsWithRoutes,
} from "src/mocks/data/dataStreams";

describe("dataStreamsAndRoutes", () => {
  it("should fetch data streams with routes", async () => {
    const payload = mockDataStreamsWithRoutes;
    const res = await getDataStreamsAndRoutes("mock_auth_token");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});

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
    const programID = 1;
    const payload: DataStream = { id: 1, programID, name };
    const res = await createDataStream("mock_auth_token", name, 1);
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});
