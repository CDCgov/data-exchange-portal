import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { ValidationStatus } from "src/types/validationStatus";
import Label from "src/components/formFields/Label";
import ErrorMessage from "src/components/formFields/ErrorMessage";

export type TextInputRef =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

export type TextInputProps = {
  id: string;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  errorMessage?: string;
  hint?: string;
  inputRef?: TextInputRef;
  inputSize?: "small" | "medium";
  label?: string;
  labelClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email" | "number" | "password" | "search" | "tel" | "url";
  validationStatus?: ValidationStatus;
};

export const TextInput = ({
  id,
  className = "",
  defaultValue = "",
  disabled = false,
  errorMessage = "",
  hint = "",
  inputRef,
  inputSize,
  label = "",
  labelClassName = "margin-top-0",
  onChange,
  placeholder = "",
  required = false,
  type = "text",
  validationStatus,
}: TextInputProps): React.ReactElement => {
  const [currentVal, setCurrentVal] = useState(defaultValue);

  useEffect(() => {
    setCurrentVal(defaultValue);
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentVal(e.target.value);

    if (onChange) {
      onChange(e);
    }
  };

  const isError = validationStatus === "error";
  const isSuccess = validationStatus === "success";
  const isSmall = inputSize === "small";
  const isMedium = inputSize === "medium";

  const classes = classnames("usa-input", {
    "usa-input--error": isError,
    "usa-input--success": isSuccess,
    "usa-input--small": isSmall,
    "usa-input--medium": isMedium,
  });

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
      <input
        value={currentVal}
        data-testid={`test-id-input-${id}`}
        className={classes}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        id={id}
        name={id}
        type={type}
        ref={inputRef}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default TextInput;
