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
  it("should create a JSON file and trigger a download", () => {
    const data = { key: "value" };
    const filename = "test.json";
    const jsonStr = JSON.stringify(data, null, 2);

    // Mock URL.createObjectURL
    const createObjectURLMock = vi.fn().mockReturnValue("blob:url");
    global.URL.createObjectURL = createObjectURLMock;

    // Mock URL.revokeObjectURL
    const revokeObjectURLMock = vi.fn();
    global.URL.revokeObjectURL = revokeObjectURLMock;

    // Mock document.createElement and link.click
    const clickMock = vi.fn();
    const createElementMock = vi.fn(() => ({
      href: "",
      download: "",
      click: clickMock,
    }));
    global.document.createElement = createElementMock;

    // Call the function
    downloadJson(data, filename);

    // Assertions
    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
    expect(createObjectURLMock).toHaveBeenCalledWith(
      new Blob([jsonStr], { type: "application/json" })
    );

    expect(revokeObjectURLMock).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLMock).toHaveBeenCalledWith("blob:url");

    expect(createElementMock).toHaveBeenCalledTimes(1);
    expect(createElementMock).toHaveBeenCalledWith("a");

    expect(clickMock).toHaveBeenCalledTimes(1);
    const link = createElementMock.mock.results[0].value;
    expect(link.href).toBe("blob:url");
    expect(link.download).toBe(filename);
  });
});
