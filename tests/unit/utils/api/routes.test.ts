import { Route, getRoutes, getRoute, createRoute } from "src/utils/api/routes";
import mockRoutes from "src/mocks/data/routes";

describe("routes", () => {
  it("should fetch routes", async () => {
    const payload = mockRoutes.filter((el: Route) => el.datastreamId == 1);
    const res = await getRoutes("mock_auth_token", 1);
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});

describe("route", () => {
  it("should fetch a particular route", async () => {
    const route = mockRoutes.find(
      (el: Route) => el.id == 1 && el.datastreamId == 1
    );
    const res = await getRoute("mock_auth_token", 1, 1);
    const data = await res.json();
    expect(data).toStrictEqual(route);
  });
  it("should return new route", async () => {
    const datastreamId = 1;
    const name = "test_name";
    const payload: Route = { id: 1, datastreamId, name };
    const res = await createRoute("mock_auth_token", datastreamId, name);
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});
