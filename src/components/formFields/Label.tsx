import React from "react";
import classnames from "classnames";
import styles from "src/styles/FormFields.module.css";

export const RequiredMarker = (): React.ReactElement => {
  return (
    <abbr title="required" className={styles["required-label-symbol"]}>
      &nbsp;*
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
    <>
      <label
        {...labelProps}
        data-testid="label"
        className={classes}
        htmlFor={htmlFor}>
        {children}
        {requiredMarker && (
          <>
            <RequiredMarker />
          </>
        )}
      </label>
      {hint && (
        <div className="usa-hint" id={`${htmlFor}-hint`}>
          {hint}
        </div>
      )}
    </>
  );
};

export default Label;
