import {
  forwardRef,
  type TextareaHTMLAttributes,
  type Ref
} from "react";

import { cn } from "./cn";
import type { ComponentSize } from "./types";

export type TextareaSize = Exclude<ComponentSize, "xs">;
export type TextareaVariant = "solid" | "soft" | "outline" | "ghost";
export type TextareaState = "default" | "success" | "warning" | "error";

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "disabled" | "size"> & {
  variant?: TextareaVariant;
  size?: TextareaSize;
  state?: TextareaState;
  disabled?: boolean;
  readonly?: boolean;
  loading?: boolean;
  maxLength?: number;
  showCounter?: boolean;
  resizable?: "none" | "vertical" | "horizontal" | "both";
};

const baseClasses = [
  "group relative inline-flex w-full flex-col",
  "rounded-medium border font-medium transition-[background-color,border-color,color,box-shadow] duration-fast ease-standard",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1",
  "aria-disabled:cursor-not-allowed aria-readonly:cursor-not-allowed",
  "motion-reduce:transition-none"
];

const textareaBaseClasses = [
  "peer w-full resize-none bg-transparent px-12 py-8 text-body placeholder:text-text-soft",
  "disabled:bg-disabled disabled:text-muted disabled:placeholder:text-muted",
  "[&:read-only]:bg-surface [&:read-only]:cursor-not-allowed",
  "focus:outline-none"
];

const variantClasses = {
  solid: "border-transparent bg-surface-raised hover:bg-background-elevated",
  soft: "border-transparent bg-background-elevated hover:bg-background",
  outline: "border-border bg-transparent hover:border-border-strong",
  ghost: "border-transparent bg-transparent hover:bg-background-elevated"
} as const satisfies Record<TextareaVariant, string>;

const sizeClasses = {
  sm: "min-h-64 px-12 py-8",
  md: "min-h-96 px-12 py-8",
  lg: "min-h-128 px-16 py-12",
  xl: "min-h-160 px-20 py-16"
} as const satisfies Record<TextareaSize, string>;

const stateClasses = {
  default: "border-border focus-visible:border-focus-ring",
  success: "border-success bg-success/5 focus-visible:border-success",
  warning: "border-warning bg-warning/5 focus-visible:border-warning",
  error: "border-danger bg-danger/5 focus-visible:border-danger"
} as const satisfies Record<TextareaState, string>;

const disabledStateClasses =
  "disabled:border-border disabled:bg-disabled disabled:text-muted disabled:placeholder:text-muted";

const resizeClasses = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize"
} as const satisfies Record<"none" | "vertical" | "horizontal" | "both", string>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    variant = "outline",
    size = "md",
    state = "default",
    disabled = false,
    readonly = false,
    loading = false,
    maxLength,
    showCounter = false,
    resizable = "vertical",
    className,
    value,
    "aria-label": ariaLabel,
    "aria-disabled": ariaDisabled,
    "aria-invalid": ariaInvalid,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;
  const isInvalid = state === "error" || ariaInvalid;
  const textValue = value && typeof value === "string" ? value : "";
  const characterCount = textValue.length;
  const isAtMax = maxLength && characterCount >= maxLength;

  return (
    <div className="relative inline-flex w-full flex-col">
      <div
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          stateClasses[state],
          disabledStateClasses,
          resizeClasses[resizable],
          className
        )}
      >
        <textarea
          ref={ref}
          aria-disabled={isDisabled || ariaDisabled || undefined}
          aria-invalid={isInvalid || undefined}
          aria-label={ariaLabel}
          className={cn(textareaBaseClasses, resizeClasses[resizable])}
          disabled={isDisabled}
          maxLength={maxLength}
          readOnly={readonly}
          value={value}
          {...props}
        />
      </div>

      {showCounter && maxLength && (
        <div
          aria-live="polite"
          className={cn("mt-4 text-caption", isAtMax ? "text-danger" : "text-text-soft")}
        >
          {characterCount} / {maxLength}
        </div>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";
