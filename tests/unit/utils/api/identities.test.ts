import {
  createIdentity,
  getIdentities,
  getIdentityDatastreamsAndRoutes,
} from "src/utils/api/identities";
import mockIdentities from "src/mocks/data/identities";
import { mockDataStreamsWithRoutes } from "src/mocks/data/dataStreams";

describe("identities -- GET", () => {
  it("should fetch entities", async () => {
    const payload = mockIdentities;
    const res = await getIdentities("mock_auth_token");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});

describe("identities -- POST", () => {
  it("should return 200 if params exist", async () => {
    const res = await createIdentity("mock_auth_token", "test_idpclient");

    expect(res.status).toStrictEqual(200);
  });
  it("should return 400 if client id is missing", async () => {
    const res = await createIdentity("mock_auth_token", "");

    expect(res.status).toStrictEqual(400);
  });
});

describe("identities -- datastreams and routes", () => {
  it("should return datastreams and routes", async () => {
    const payload = mockDataStreamsWithRoutes;
    const res = await getIdentityDatastreamsAndRoutes("mock_auth_token", 1);
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});
