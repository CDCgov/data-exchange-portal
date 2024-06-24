import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TextInput from "src/components/formFields/TextInput";

describe("TextInput component", () => {
  it("renders the TextInput component with default props", () => {
    render(<TextInput id="test-input" />);

    const input = screen.getByTestId("test-id-input-test-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("usa-input");
  });

  it("renders with the given label", () => {
    render(<TextInput id="test-input" label="Test Label" />);

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "test-input");
  });

  it("renders with an error message", () => {
    render(
      <TextInput
        id="test-input"
        errorMessage="Error message"
        validationStatus="error"
      />
    );

    const errorMessage = screen.getByText("Error message");
    expect(errorMessage).toBeInTheDocument();
    const input = screen.getByTestId("test-id-input-test-input");
    expect(input).toHaveClass("usa-input--error");
  });

  it("renders with a success status", () => {
    render(<TextInput id="test-input" validationStatus="success" />);

    const input = screen.getByTestId("test-id-input-test-input");
    expect(input).toHaveClass("usa-input--success");
  });

  it("calls onChange when input value changes", () => {
    const handleChange = vi.fn();
    render(<TextInput id="test-input" onChange={handleChange} />);

    const input = screen.getByTestId(
      "test-id-input-test-input"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "new value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("new value");
  });

  it("renders with the given placeholder", () => {
    render(<TextInput id="test-input" placeholder="Enter text" />);

    const input = screen.getByTestId("test-id-input-test-input");
    expect(input).toHaveAttribute("placeholder", "Enter text");
  });

  it("renders with the given default value", () => {
    render(<TextInput id="test-input" defaultValue="default value" />);

    const input = screen.getByTestId(
      "test-id-input-test-input"
    ) as HTMLInputElement;
    expect(input.value).toBe("default value");
  });

  it("renders with the disabled attribute", () => {
    render(<TextInput id="test-input" disabled />);

    const input = screen.getByTestId("test-id-input-test-input");
    expect(input).toBeDisabled();
  });

  it("applies the small input size class", () => {
    render(<TextInput id="test-input" inputSize="small" />);

    const input = screen.getByTestId("test-id-input-test-input");
    expect(input).toHaveClass("usa-input--small");
  });

  it("applies the medium input size class", () => {
    render(<TextInput id="test-input" inputSize="medium" />);

    const input = screen.getByTestId("test-id-input-test-input");
    expect(input).toHaveClass("usa-input--medium");
  });
});
