import {
  type HTMLAttributes,
  type ReactNode
} from "react";

import { cn } from "./cn";

type FieldWrapperProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  required?: boolean;
  state?: "default" | "success" | "warning" | "error";
  disabled?: boolean;
  spacing?: "compact" | "normal" | "comfortable";
};

const spacingClasses = {
  compact: "gap-4",
  normal: "gap-8",
  comfortable: "gap-12"
} as const;

export function FieldWrapper({
  children,
  label,
  helperText,
  errorText,
  required = false,
  state = "default",
  disabled = false,
  spacing = "normal",
  className,
  ...props
}: FieldWrapperProps) {
  const displayError = state === "error" && errorText;
  const displayHelper = state !== "error" && helperText;

  return (
    <div
      {...props}
      className={cn("inline-flex w-full flex-col", spacingClasses[spacing], className)}
    >
      {label && (
        <label
          className={cn(
            "text-small font-medium text-text transition-colors duration-fast ease-standard",
            disabled && "text-disabled"
          )}
        >
          {label}
          {required && <span className="ml-4 text-danger">*</span>}
        </label>
      )}

      {children}

      {displayError && (
        <div
          aria-live="polite"
          className="text-caption text-danger"
          role="alert"
        >
          {errorText}
        </div>
      )}

      {displayHelper && (
        <div className="text-caption text-text-soft">
          {helperText}
        </div>
      )}
    </div>
  );
}
