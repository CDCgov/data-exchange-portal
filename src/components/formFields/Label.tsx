import React from "react";
import classnames from "classnames";

export const RequiredMarker = (): React.ReactElement => {
  return (
    <abbr title="required" className="usa-hint usa-hint--required">
      *
    </abbr>
  );
};

type LabelProps = {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
  error?: boolean;
  hint?: React.ReactNode;
  srOnly?: boolean;
  requiredMarker?: boolean;
};

export const Label = ({
  children,
  htmlFor,
  className,
  error,
  hint,
  srOnly,
  requiredMarker,
  ...labelProps
}: LabelProps & JSX.IntrinsicElements["label"]): React.ReactElement => {
  const classes = classnames(
    {
      "usa-label": !srOnly,
      "usa-sr-only": srOnly,
      "usa-label--error": error,
    },
    className
  );

  return (
    <label
      {...labelProps}
      data-testid="label"
      className={classes}
      htmlFor={htmlFor}>
      {children}
      {hint && <span className="usa-hint">{hint}</span>}
      {requiredMarker && (
        <>
          {" "}
          <RequiredMarker />
        </>
      )}
    </label>
  );
};

export default Label;
