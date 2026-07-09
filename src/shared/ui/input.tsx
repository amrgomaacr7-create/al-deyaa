import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref
} from "react";

import { cn } from "./cn";
import type { ColorScheme, ComponentSize } from "./types";

export type InputSize = ComponentSize | "icon";
export type InputVariant = "solid" | "soft" | "outline" | "ghost";
export type InputState = "default" | "success" | "warning" | "error";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "disabled" | "size"> & {
  variant?: InputVariant;
  size?: InputSize;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClear?: () => void;
  clearable?: boolean;
  maxLength?: number;
  showCounter?: boolean;
};

const baseClasses = [
  "group relative inline-flex w-full flex-col",
  "rounded-medium border font-medium transition-[background-color,border-color,color,box-shadow] duration-fast ease-standard",
  "placeholder:text-text-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1",
  "aria-disabled:cursor-not-allowed aria-readonly:cursor-not-allowed",
  "motion-reduce:transition-none"
];

const inputBaseClasses = [
  "peer w-full bg-transparent px-12 py-8 text-body placeholder:text-text-soft",
  "disabled:bg-disabled disabled:text-muted disabled:placeholder:text-muted",
  "[&:read-only]:bg-surface [&:read-only]:cursor-not-allowed",
  "autofill:!bg-transparent autofill:!text-text"
];

const variantClasses = {
  solid: "border-transparent bg-surface-raised hover:bg-background-elevated",
  soft: "border-transparent bg-background-elevated hover:bg-background",
  outline: "border-border bg-transparent hover:border-border-strong",
  ghost: "border-transparent bg-transparent hover:bg-background-elevated"
} as const satisfies Record<InputVariant, string>;

const sizeClasses = {
  xs: "min-h-24 px-8 py-4",
  sm: "min-h-32 px-12 py-8",
  md: "min-h-40 px-12 py-8",
  lg: "min-h-48 px-16 py-12",
  xl: "min-h-64 px-20 py-16",
  icon: "size-40 p-4"
} as const satisfies Record<InputSize, string>;

const iconClasses = {
  xs: "size-12",
  sm: "size-16",
  md: "size-16",
  lg: "size-20",
  xl: "size-24",
  icon: "size-20"
} as const satisfies Record<InputSize, string>;

const stateClasses = {
  default: "border-border focus-visible:border-focus-ring",
  success: "border-success bg-success/5 focus-visible:border-success",
  warning: "border-warning bg-warning/5 focus-visible:border-warning",
  error: "border-danger bg-danger/5 focus-visible:border-danger"
} as const satisfies Record<InputState, string>;

const disabledStateClasses =
  "disabled:border-border disabled:bg-disabled disabled:text-muted disabled:placeholder:text-muted";

function InputWrapper({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & InputHTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn(baseClasses, className)}>
      {children}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    variant = "outline",
    size = "md",
    state = "default",
    disabled = false,
    readonly = false,
    loading = false,
    leftIcon,
    rightIcon,
    clearable = false,
    onClear,
    maxLength,
    showCounter = false,
    className,
    value,
    "aria-label": ariaLabel,
    "aria-disabled": ariaDisabled,
    "aria-invalid": ariaInvalid,
    id,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;
  const isInvalid = state === "error" || ariaInvalid;
  const inputValue = value && typeof value === "string" ? value : "";
  const characterCount = inputValue.length;
  const isAtMax = maxLength && characterCount >= maxLength;

  return (
    <InputWrapper>
      <div
        className={cn(
          "relative flex items-center",
          sizeClasses[size],
          variantClasses[variant],
          stateClasses[state],
          disabledStateClasses,
          className
        )}
      >
        {leftIcon && (
          <span
            aria-hidden="true"
            className={cn("pointer-events-none absolute left-12 shrink-0 text-text-soft", iconClasses[size])}
          >
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          aria-disabled={isDisabled || ariaDisabled || undefined}
          aria-invalid={isInvalid || undefined}
          aria-label={ariaLabel}
          className={cn(
            inputBaseClasses,
            leftIcon && "pl-40",
            (rightIcon || clearable) && "pr-40",
            "focus:outline-none"
          )}
          disabled={isDisabled}
          id={id}
          maxLength={maxLength}
          readOnly={readonly}
          value={value}
          {...props}
        />

        {clearable && value && !isDisabled && (
          <button
            aria-label="Clear input"
            className="group/clear absolute right-12 inline-flex h-full items-center justify-center text-text-soft hover:text-text"
            onClick={() => onClear?.()}
            tabIndex={-1}
            type="button"
          >
            <svg
              aria-hidden="true"
              className={cn("shrink-0 transition-colors", iconClasses[size])}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}

        {rightIcon && !clearable && (
          <span
            aria-hidden="true"
            className={cn("pointer-events-none absolute right-12 shrink-0 text-text-soft", iconClasses[size])}
          >
            {rightIcon}
          </span>
        )}

        {loading && (
          <span
            aria-busy="true"
            className="absolute right-12 animate-spin"
            role="status"
          >
            <svg
              aria-hidden="true"
              className={cn("shrink-0", iconClasses[size])}
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="text-current" cx="12" cy="12" r="10" stroke="currentColor" />
              <path className="text-current" d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" />
            </svg>
          </span>
        )}
      </div>

      {showCounter && maxLength && (
        <div
          aria-live="polite"
          className={cn("mt-4 text-caption", isAtMax ? "text-danger" : "text-text-soft")}
        >
          {characterCount} / {maxLength}
        </div>
      )}
    </InputWrapper>
  );
});

Input.displayName = "Input";
