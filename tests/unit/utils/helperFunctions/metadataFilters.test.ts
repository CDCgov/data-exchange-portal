import { describe, it, expect } from "vitest";
import {
  getDataStreamIds,
  getDataStreamIdsWriteOnly,
  getDataRoutes,
  getDataRoutesWriteOnly,
} from "src/utils/helperFunctions/metadataFilters";
import { DataStreamWithRoutes } from "src/utils/api/dataStreams";

const mockData: DataStreamWithRoutes[] = [
  {
    datastream: { id: 1, name: "Stream1" },
    routes: [
      { id: 1, dataStreamID: 1, name: "Route1", writePermissions: true },
      { id: 2, dataStreamID: 1, name: "Route2", writePermissions: false },
    ],
  },
  {
    datastream: { id: 2, name: "Stream2" },
    routes: [
      { id: 3, dataStreamID: 2, name: "Route3", writePermissions: false },
    ],
  },
];

describe("Helper Functions", () => {
  it("should return datastream names", () => {
    const result = getDataStreamIds(mockData);
    expect(result).toEqual(["Stream1", "Stream2"]);
  });

  it("should return routes for a given datastream name", () => {
    const result = getDataRoutes(mockData, "Stream1");
    expect(result).toEqual(["All", "Route1", "Route2"]);

    const result2 = getDataRoutes(mockData, "Stream2");
    expect(result2).toEqual(["Route3"]);

    const result3 = getDataRoutes(mockData, "NonExistentStream");
    expect(result3).toEqual([]);
  });

  it("should return only datastream names with routes that are write only permissions", () => {
    const result = getDataStreamIdsWriteOnly(mockData);
    expect(result).toEqual(["Stream1"]);
  });

  it("should return routes for a given datastream name that have write permissions", () => {
    const result = getDataRoutesWriteOnly(mockData, "Stream1");
    expect(result).toEqual(["Route1"]);

    const result2 = getDataRoutesWriteOnly(mockData, "Stream2");
    expect(result2).toEqual([]);
  });
});
