import {
  Manifest,
  getManifests,
  createManifest,
} from "src/utils/api/manifests";
import mockManifests from "src/mocks/data/manifests";

describe("manifests", () => {
  it("should fetch manifests", async () => {
    const payload = mockManifests.find(
      (el: Manifest) => el.dataStreamRouteID == 1
    );
    const res = await getManifests("mock_auth_token", "aims-celr", "csv");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});

describe("manifest", () => {
  it("should return new manifest", async () => {
    const datastream = "daart";
    const route = "hl7";
    const config = {
      metadata_config: {
        version: "2.0",
        fields: [],
      },
      copy_config: {},
    };
    const payload: Manifest = {
      id: 1,
      dataStreamRouteID: 3,
      config,
    };
    const res = await createManifest(
      "mock_auth_token",
      datastream,
      route,
      config
    );
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});
