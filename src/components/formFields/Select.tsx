import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { ValidationStatus } from "src/types/validationStatus";
import Label from "src/components/formFields/Label";
import ErrorMessage from "src/components/formFields/ErrorMessage";

export type SelectOption = {
  value: string | number;
  display: string | JSX.Element;
};

export type SelectProps = {
  id: string;
  options: SelectOption[];
  className?: string;
  labelClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  validationStatus?: ValidationStatus;
  inputRef?:
    | string
    | ((instance: HTMLSelectElement | null) => void)
    | React.RefObject<HTMLSelectElement>
    | null
    | undefined;
  label?: string;
  hint?: string;
  required?: boolean;
  errorMessage?: string;
  defaultValue?: string;
  disabled?: boolean;
};

export const Select = ({
  id,
  options,
  onChange,
  className = "",
  labelClassName = "margin-top-0",
  inputRef,
  validationStatus,
  label = "",
  hint = "",
  required = false,
  errorMessage = "",
  defaultValue = "",
  disabled = false,
}: SelectProps): React.ReactElement => {
  const [currentVal, setCurrentVal] = useState(defaultValue);

  useEffect(() => {
    setCurrentVal(defaultValue);
  }, [defaultValue]);

  const isError = validationStatus === "error";
  const isSuccess = validationStatus === "success";
  const classes = classnames("usa-select", {
    "usa-input--error": isError,
    "usa-input--success": isSuccess,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentVal(e.target.value);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={className}>
      {label && (
        <Label
          requiredMarker={required}
          htmlFor={id}
          hint={hint}
          className={labelClassName}>
          {label}
        </Label>
      )}
      <select
        value={currentVal}
        data-testid={`test-id-select-${id}`}
        className={classes}
        onChange={handleChange}
        disabled={disabled}
        id={id}
        name={id}
        ref={inputRef}>
        <>
          <option>- Select -</option>
          {options.map(({ value, display }: SelectOption) => (
            <option key={value} value={value}>
              {display}
            </option>
          ))}
        </>
      </select>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default Select;
