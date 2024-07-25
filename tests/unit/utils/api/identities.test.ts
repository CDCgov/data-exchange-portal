import { createIdentity, getIdentities } from "src/utils/api/identities";
import mockIdentities from "src/mocks/data/identities";

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
