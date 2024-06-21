import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { ValidationStatus } from "src/types/validationStatus";
import Label from "src/components/formFields/Label";
import ErrorMessage from "src/components/formFields/ErrorMessage";

type TextInputRef =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

type TextInputProps = {
  id: string;
  type: "text" | "email" | "number" | "password" | "search" | "tel" | "url";
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelClassName?: string;
  validationStatus?: ValidationStatus;
  inputSize?: "small" | "medium";
  inputRef?: TextInputRef;
  label?: string;
  hint?: string;
  required?: boolean;
  errorMessage?: string;
  defaultValue?: string;
  disabled?: boolean;
};

export const TextInput = ({
  id,
  type,
  onChange,
  className,
  labelClassName = "margin-top-0",
  validationStatus,
  inputSize,
  inputRef,
  label = "",
  hint = "",
  required = false,
  errorMessage = "",
  defaultValue = "",
  disabled = false,
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
