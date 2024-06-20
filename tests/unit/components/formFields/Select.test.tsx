import { ValidationStatus } from "src/types/validationStatus";
import { render, screen } from "@testing-library/react";

import Select, { SelectOption } from "src/components/formFields/Select";

describe("Select component", () => {
  const renderSelect = (validationStatus?: ValidationStatus) => {
    const options: SelectOption[] = [
      { value: "value1", display: "Option A" },
      { value: "value2", display: "Option B" },
      { value: "value3", display: "Option C" },
    ];

    render(
      <Select
        id="input-type-dropdown"
        options={options}
        validationStatus={validationStatus}
      />
    );

    const queryForSelect = () => screen.queryByRole("combobox");

    return {
      queryForSelect,
    };
  };

  it("renders without errors", () => {
    const { queryForSelect } = renderSelect();

    const select = queryForSelect();

    expect(select).toBeInTheDocument();
    expect(select).toHaveClass("usa-select");
  });

  describe("validationStatus", () => {
    it("renders with error styling", () => {
      const { queryForSelect } = renderSelect("error");

      const select = queryForSelect();

      expect(select).toBeInTheDocument();
      expect(select).toHaveClass("usa-select");
      expect(select).toHaveClass("usa-input--error");
    });

    it("renders with success styling", () => {
      const { queryForSelect } = renderSelect("success");

      const select = queryForSelect();

      expect(select).toBeInTheDocument();
      expect(select).toHaveClass("usa-select");
      expect(select).toHaveClass("usa-input--success");
    });
  });
});
