import { getEntities, getEntity, createEntity } from "src/utils/api/entities";
import mockEntities from "src/mocks/data/entities";

describe("entities", () => {
  it("should fetch entities", async () => {
    const payload = mockEntities;
    const res = await getEntities("mock_auth_token");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});

describe("entity", () => {
  it("should fetch a particular entity", async () => {
    const payload = mockEntities[0];
    const res = await getEntity("mock_auth_token", 1);

    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
  it("should return new entity", async () => {
    const name = "test_name";
    const payload = { id: 1, name };
    const res = await createEntity("mock_auth_token", name);
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});
