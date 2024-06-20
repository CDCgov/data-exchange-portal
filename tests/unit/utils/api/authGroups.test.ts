import {
  getAuthGroups,
  createAuthGroup,
  assignAuthGroupToDataStream,
  assignUserToAuthGroup,
} from "src/utils/api/authGroups";
import mockAuthgroups from "src/mocks/data/authGroups";

describe("authgroups - GET", () => {
  it("should fetch authGroups", async () => {
    const payload = mockAuthgroups;
    const res = await getAuthGroups("mock_auth_token", 1);
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});

describe("authgroups - POST", () => {
  it("should return 200 if all params exist", async () => {
    const res = await createAuthGroup("mock_auth_token", 1, "test_auth_group");

    expect(res.status).toStrictEqual(200);
  });

  it("should return 400 without name", async () => {
    const res = await createAuthGroup("mock_auth_token", 1, "");

    expect(res.status).toStrictEqual(400);
  });
});

describe("assign user to authgroup - POST", () => {
  it("should return 200 if all params exist", async () => {
    const res = await assignUserToAuthGroup("mock_auth_token", 1, 1);

    expect(res.status).toStrictEqual(200);
  });
});

describe("assign datastream to authgroup - POST", () => {
  it("should return 200 if all params exist", async () => {
    const res = await assignAuthGroupToDataStream("mock_auth_token", 1, 1);

    expect(res.status).toStrictEqual(200);
  });
});
