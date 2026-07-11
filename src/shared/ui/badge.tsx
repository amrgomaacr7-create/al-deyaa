import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "./cn";
import { Inline } from "./layout";
import { Small } from "./typography";
import type { WithClassName } from "./types";
import type { SpacingToken } from "@/styles/tokens";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

export type BadgeSize = "xs" | "sm" | "md" | "lg";
export type BadgeAppearance = "solid" | "outline" | "ghost";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  WithClassName & {
    variant?: BadgeVariant;
    size?: BadgeSize;
    appearance?: BadgeAppearance;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    rounded?: boolean;
    pill?: boolean;
    removable?: boolean;
    removeLabel?: string;
    onRemove?: () => void;
  };

export type BadgeGroupProps = HTMLAttributes<HTMLDivElement> &
  WithClassName & {
    children?: ReactNode;
    gap?: SpacingToken;
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "between";
  };

export type StatusBadgeProps = Omit<BadgeProps, "leftIcon" | "rightIcon"> & {
  status: ReactNode;
};

export type DotBadgeProps = HTMLAttributes<HTMLSpanElement> &
  WithClassName & {
    variant?: BadgeVariant;
    size?: BadgeSize;
    label?: string;
  };

const variantStyles: Record<BadgeAppearance, Record<BadgeVariant, string>> = {
  solid: {
    primary: "border-transparent bg-primary text-surface-raised",
    secondary: "border-transparent bg-secondary text-surface-raised",
    success: "border-transparent bg-success text-surface-raised",
    warning: "border-transparent bg-warning text-text",
    danger: "border-transparent bg-danger text-surface-raised",
    info: "border-transparent bg-info text-surface-raised",
    neutral: "border-transparent bg-surface-raised text-text"
  },
  outline: {
    primary: "border-primary bg-transparent text-primary hover:bg-primary/10",
    secondary: "border-secondary bg-transparent text-secondary hover:bg-secondary/10",
    success: "border-success bg-transparent text-success hover:bg-success/10",
    warning: "border-warning bg-transparent text-warning hover:bg-warning/10",
    danger: "border-danger bg-transparent text-danger hover:bg-danger/10",
    info: "border-info bg-transparent text-info hover:bg-info/10",
    neutral: "border-border bg-transparent text-text hover:bg-background-elevated"
  },
  ghost: {
    primary: "border-transparent bg-transparent text-primary hover:bg-primary/10",
    secondary: "border-transparent bg-transparent text-secondary hover:bg-secondary/10",
    success: "border-transparent bg-transparent text-success hover:bg-success/10",
    warning: "border-transparent bg-transparent text-warning hover:bg-warning/10",
    danger: "border-transparent bg-transparent text-danger hover:bg-danger/10",
    info: "border-transparent bg-transparent text-info hover:bg-info/10",
    neutral: "border-transparent bg-transparent text-text hover:bg-background-elevated"
  }
};

const sizeStyles: Record<BadgeSize, string> = {
  xs: "text-small px-8 py-4",
  sm: "text-small px-10 py-4",
  md: "text-body px-12 py-6",
  lg: "text-body px-16 py-8"
};

const shapeStyles: Record<"default" | "rounded" | "pill", string> = {
  default: "rounded-medium",
  rounded: "rounded-large",
  pill: "rounded-pill"
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = "neutral",
    size = "md",
    appearance = "solid",
    leftIcon,
    rightIcon,
    rounded = false,
    pill = false,
    removable = false,
    removeLabel,
    onRemove,
    className,
    children,
    ...props
  },
  ref
) {
  const shape = pill ? "pill" : rounded ? "rounded" : "default";
  const isRemovable = removable && typeof onRemove === "function";
  const labelText = typeof children === "string" ? children : undefined;
  const accessibleRemoveLabel = removeLabel ?? `Remove ${labelText ?? "badge"}`;

  return (
    <span
      ref={ref}
      {...props}
      className={cn(
        "inline-flex items-center gap-8 border font-medium",
        sizeStyles[size],
        variantStyles[appearance][variant],
        shapeStyles[shape],
        className
      )}
    >
      {leftIcon ? (
        <span aria-hidden="true" className="inline-flex items-center justify-center">
          {leftIcon}
        </span>
      ) : null}

      {children && <Small as="span">{children}</Small>}

      {rightIcon ? (
        <span aria-hidden="true" className="inline-flex items-center justify-center">
          {rightIcon}
        </span>
      ) : null}

      {isRemovable ? (
        <button
          type="button"
          aria-label={accessibleRemoveLabel}
          className="inline-flex h-24 w-24 items-center justify-center rounded-full border-0 bg-transparent text-current transition-colors duration-fast ease-standard hover:bg-background-elevated"
          onClick={onRemove}
        >
          <span aria-hidden="true" className="text-body leading-none">
            ×
          </span>
        </button>
      ) : null}
    </span>
  );
});

Badge.displayName = "Badge";

export function BadgeGroup({
  gap = 12,
  align = "center",
  justify = "start",
  className,
  children,
  ...props
}: BadgeGroupProps) {
  return (
    <Inline {...props} gap={gap} align={align} justify={justify} className={cn(className)}>
      {children}
    </Inline>
  );
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  (
    {
      status,
      variant = "neutral",
      size = "sm",
      appearance = "outline",
      rounded = true,
      pill = false,
      onRemove,
      removeLabel,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const dot = <span className={cn("inline-flex h-10 w-10 shrink-0 rounded-full bg-current")} />;

    return (
      <Badge
        ref={ref}
        variant={variant}
        size={size}
        appearance={appearance}
        rounded={rounded}
        pill={pill}
        leftIcon={dot}
        onRemove={onRemove}
        removeLabel={removeLabel}
        className={className}
        {...props}
      >
        {status}
        {children}
      </Badge>
    );
  }
);

StatusBadge.displayName = "StatusBadge";

export const DotBadge = forwardRef<HTMLSpanElement, DotBadgeProps>(function DotBadge(
  {
    variant = "neutral",
    size = "sm",
    label,
    className,
    ...props
  },
  ref
) {
  return (
    <span
      ref={ref}
      {...props}
      className={cn(
        "inline-flex items-center gap-8",
        sizeStyles[size],
        variantStyles.ghost[variant],
        shapeStyles.default,
        className
      )}
    >
      <span className={cn("inline-flex h-10 w-10 shrink-0 rounded-full bg-current")}></span>
      {label ? <Small as="span">{label}</Small> : null}
    </span>
  );
});

DotBadge.displayName = "DotBadge";
