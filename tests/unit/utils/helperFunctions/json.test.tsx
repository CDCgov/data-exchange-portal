import { render } from "@testing-library/react";
import { downloadJson, jsonPrettyPrint } from "src/utils/helperFunctions/json";
import { describe, it, expect, vi } from "vitest";

describe("jsonPrettyPrint Function", () => {
  it("correctly formats and renders JSON data", () => {
    const testData = {
      name: "Test Person",
      age: 30,
      subscribed: true,
    };

    const { container } = render(jsonPrettyPrint(testData));
    const expectedJsonString = JSON.stringify(testData, null, 2);

    const preElement = container.firstChild as HTMLElement;

    expect(preElement).not.toBeNull();
    expect(preElement.innerHTML).toBe(expectedJsonString);
  });

  it("handles null input", () => {
    const { container } = render(jsonPrettyPrint(null));
    expect(container.firstChild).toHaveTextContent("null");
  });

  it("handles empty objects", () => {
    const { container } = render(jsonPrettyPrint({}));
    expect(container.firstChild).toHaveTextContent("{}");
  });

  it("handles arrays", () => {
    const testData = [1, 2, 3];
    const { container } = render(jsonPrettyPrint(testData));
    const expectedJsonString = JSON.stringify(testData, null, 2);

    const preElement = container.firstChild as HTMLElement;

    expect(preElement).not.toBeNull();
    expect(preElement.innerHTML).toBe(expectedJsonString);
  });
});

describe("downloadJson", () => {
  it("should create a link element, set its href and download attributes, and click it", () => {
    const mockCreateObjectURL = vi.fn(() => "blob:url");
    const mockRevokeObjectURL = vi.fn();
    const mockClick = vi.fn();
    const mockCreateElement = vi.fn(() => ({
      href: "",
      download: "",
      click: mockClick,
    }));

    global.URL.createObjectURL = mockCreateObjectURL;
    global.URL.revokeObjectURL = mockRevokeObjectURL;
    global.document.createElement =
      mockCreateElement as unknown as typeof document.createElement;

    const data = { key: "value" };
    const filename = "test.json";

    downloadJson(data, filename);

    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalledWith("blob:url");
    expect(mockCreateElement).toHaveBeenCalledWith("a");

    const linkElement = mockCreateElement.mock.results[0].value;
    expect(linkElement.href).toBe("blob:url");
    expect(linkElement.download).toBe(filename);
    expect(mockClick).toHaveBeenCalled();
  });
});
