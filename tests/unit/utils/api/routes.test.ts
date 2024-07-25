import { Route, getRoutes, getRoute, createRoute } from "src/utils/api/routes";
import { mockRoutes1 } from "src/mocks/data/routes";

describe("routes", () => {
  it("should fetch routes", async () => {
    const payload = mockRoutes1;
    const res = await getRoutes("mock_auth_token", 1);
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});

describe("route", () => {
  it("should fetch a particular route", async () => {
    const route = mockRoutes1.find((el: Route) => el.id == 1);
    const res = await getRoute("mock_auth_token", 1, 1);
    const data = await res.json();
    expect(data).toStrictEqual(route);
  });
  it("should return new route", async () => {
    const dataStreamID = 1;
    const name = "test_name";
    const payload: Route = { id: 1, dataStreamID, name };
    const res = await createRoute("mock_auth_token", dataStreamID, name);
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});
