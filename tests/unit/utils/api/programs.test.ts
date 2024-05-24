import {
  Program,
  getPrograms,
  getProgram,
  createProgram,
} from "src/utils/api/programs";
import { mockPrograms1 } from "src/mocks/data/programs";

describe("programs", () => {
  it("should fetch programs", async () => {
    const payload = mockPrograms1;
    const res = await getPrograms("mock_auth_token", 1);
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});

describe("program", () => {
  it("should fetch a particular program", async () => {
    const program = mockPrograms1.find((el: Program) => el.id == 1);
    const res = await getProgram("mock_auth_token", 1, 1);
    const data = await res.json();
    expect(data).toStrictEqual(program);
  });
  it("should return new program", async () => {
    const entityID = 1;
    const name = "test_name";
    const payload: Program = { id: 1, entityID, name };
    const res = await createProgram("mock_auth_token", entityID, name);
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });
});
