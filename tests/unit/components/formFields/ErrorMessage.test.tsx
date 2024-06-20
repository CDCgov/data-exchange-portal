import { render } from "@testing-library/react";

import ErrorMessage from "src/components/formFields/ErrorMessage";

describe("ErrorMessage component", () => {
  it("renders without errors", () => {
    const { queryByTestId } = render(
      <ErrorMessage>Helpful error message</ErrorMessage>
    );
    expect(queryByTestId("errorMessage")).toBeInTheDocument();
  });

  it("renders its children", () => {
    const { queryByText } = render(
      <ErrorMessage>Helpful error message</ErrorMessage>
    );
    expect(queryByText("Helpful error message")).toBeInTheDocument();
  });
});
