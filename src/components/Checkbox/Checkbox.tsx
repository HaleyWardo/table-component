import React from "react";
import "./Checkbox.css";

interface CheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
  isIndeterminate?: boolean;
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  "aria-label": ariaLabel,
  isIndeterminate,
  label,
  ...restProps
}) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const id = React.useId();

  if (!label && !ariaLabel && process.env.NODE_ENV === "development") {
    throw new Error("Either 'label' or 'aria-label' prop is required.");
  }

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (isIndeterminate) {
      ref.current.indeterminate = true;
      ref.current.checked = false;
    } else {
      ref.current.indeterminate = false;
    }
  }, [isIndeterminate]);

  return (
    <div className="checkbox-container">
      <input
        aria-label={ariaLabel}
        id={id}
        ref={ref}
        type="checkbox"
        {...restProps}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
};
