import {
  Manifest,
  getManifests,
  getManifest,
  createManifest,
} from "src/utils/api/manifests";
import mockManifests from "src/mocks/data/manifests";

describe("manifests", () => {
  it("should fetch manifests", async () => {
    const payload = mockManifests.filter(
      (el: Manifest) => el.datastreamId == 1 && el.routeId == 1
    );
    const res = await getManifests("mock_auth_token", 1, 1);
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});

describe("manifest", () => {
  it("should fetch a particular manifest", async () => {
    const manifest = mockManifests.find(
      (el: Manifest) => el.id == 1 && el.datastreamId == 1 && el.routeId == 1
    );
    const res = await getManifest("mock_auth_token", 1, 1, 1);
    const data = await res.json();
    expect(data).toStrictEqual(manifest);
  });
  it("should return new manifest", async () => {
    const datastreamId = 1;
    const routeId = 1;
    const manifestJson = JSON.stringify({ config: "test config" });
    const payload: Manifest = {
      id: 1,
      datastreamId,
      routeId,
      manifestJson,
    };
    const res = await createManifest(
      "mock_auth_token",
      datastreamId,
      routeId,
      manifestJson
    );
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});
