import React from "react";
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
  validationStatus?: ValidationStatus;
  inputRef?:
    | string
    | ((instance: HTMLSelectElement | null) => void)
    | React.RefObject<HTMLSelectElement>
    | null
    | undefined;
  label?: string;
  required?: boolean;
  errors?: string;
};

export const Select = ({
  id,
  options,
  className,
  inputRef,
  validationStatus,
  label = "",
  required = false,
  errors = "",
  ...inputProps
}: SelectProps & JSX.IntrinsicElements["select"]): React.ReactElement => {
  const isError = validationStatus === "error";
  const isSuccess = validationStatus === "success";
  const classes = classnames(
    "usa-select",
    {
      "usa-input--error": isError,
      "usa-input--success": isSuccess,
    },
    className
  );

  return (
    <>
      {label ?? (
        <Label requiredMarker={required} htmlFor={id}>
          {label}
        </Label>
      )}
      <select
        data-testid="Select"
        className={classes}
        id={id}
        name={id}
        ref={inputRef}
        {...inputProps}>
        <>
          <option>- Select -</option>
          {options.map(({ value, display }: SelectOption) => (
            <option value={value}>{display}</option>
          ))}
        </>
      </select>
      {errors ?? <ErrorMessage>{errors}</ErrorMessage>}
    </>
  );
};

export default Select;
