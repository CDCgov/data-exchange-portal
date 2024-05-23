import { render } from "@testing-library/react";
import { jsonPrettyPrint } from "src/utils/helperFunctions/json";

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
