import { describe, it, expect } from "vitest";
import {
  getDataStreamIds,
  getDataRoutes,
  getDataStreamOptions,
  getRoutesOptions,
} from "src/utils/helperFunctions/metadataFilters";
import { DataStreamWithRoutes } from "src/utils/api/dataStreams";
import { SelectOption } from "src/components/formFields/Select";

const mockData: DataStreamWithRoutes[] = [
  {
    datastream: { id: 1, programID: 1, name: "Stream1" },
    routes: [
      { id: 1, dataStreamID: 1, name: "Route1" },
      { id: 2, dataStreamID: 1, name: "Route2" },
    ],
  },
  {
    datastream: { id: 2, programID: 1, name: "Stream2" },
    routes: [{ id: 3, dataStreamID: 2, name: "Route3" }],
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

  it("should return datastream options", () => {
    const result = getDataStreamOptions(mockData);
    const expected: SelectOption[] = [
      { value: "Stream1", display: "Stream1" },
      { value: "Stream2", display: "Stream2" },
    ];
    expect(result).toEqual(expected);
  });

  it("should return route options for a given datastream name", () => {
    const result = getRoutesOptions(mockData, "Stream1");
    const expected: SelectOption[] = [
      { value: "All", display: "All" },
      { value: "Route1", display: "Route1" },
      { value: "Route2", display: "Route2" },
    ];
    expect(result).toEqual(expected);

    const result2 = getRoutesOptions(mockData, "Stream2");
    const expected2: SelectOption[] = [{ value: "Route3", display: "Route3" }];
    expect(result2).toEqual(expected2);

    const result3 = getRoutesOptions(mockData, "NonExistentStream");
    expect(result3).toEqual([]);
  });
});
