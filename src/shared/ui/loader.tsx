import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "./cn";
import { Body, Small } from "./typography";
import type { ColorScheme, WithClassName } from "./types";

export type SpinnerSize = "xs" | "sm" | "md" | "lg";

export type SpinnerProps = HTMLAttributes<HTMLDivElement> &
  WithClassName & {
    size?: SpinnerSize;
    variant?: ColorScheme;
    label?: string;
    labelPosition?: "bottom" | "right";
  };

export type SkeletonSize = "xs" | "sm" | "md" | "lg";
export type SkeletonShape = "rect" | "circle" | "text";

export type SkeletonProps = HTMLAttributes<HTMLDivElement> &
  WithClassName & {
    size?: SkeletonSize;
    shape?: SkeletonShape;
    width?: string;
    height?: string;
    animated?: boolean;
  };

export type LoadingOverlayProps = HTMLAttributes<HTMLDivElement> &
  WithClassName & {
    active?: boolean;
    label?: string;
    children?: ReactNode;
  };

export type ProgressCircleProps = HTMLAttributes<HTMLDivElement> &
  WithClassName & {
    value: number;
    max?: number;
    size?: SpinnerSize;
    variant?: ColorScheme;
    label?: string;
    showValue?: boolean;
    ariaLabel?: string;
  };

export type ProgressBarProps = HTMLAttributes<HTMLDivElement> &
  WithClassName & {
    value?: number;
    max?: number;
    variant?: ColorScheme;
    size?: "sm" | "md" | "lg";
    label?: string;
    showValue?: boolean;
    indeterminate?: boolean;
    width?: string;
  };

const spinnerSizeClasses: Record<SpinnerSize, string> = {
  xs: "size-16 border-2",
  sm: "size-20 border-2",
  md: "size-28 border-4",
  lg: "size-36 border-4"
};

const progressBarHeight: Record<NonNullable<ProgressBarProps["size"]>, string> = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12"
};

const progressCircleSize: Record<SpinnerSize, number> = {
  xs: 32,
  sm: 44,
  md: 56,
  lg: 72
};

const progressCircleStroke: Record<SpinnerSize, number> = {
  xs: 3,
  sm: 3,
  md: 4,
  lg: 5
};

const variantFillColors: Record<ColorScheme, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-border"
};

const variantTextColors: Record<ColorScheme, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
  neutral: "text-text"
};

const variantStrokeColors: Record<ColorScheme, string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  accent: "var(--color-accent)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
  info: "var(--color-info)",
  neutral: "var(--color-border)"
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(function Spinner(
  {
    size = "md",
    variant = "primary",
    label,
    labelPosition = "bottom",
    className,
    ...props
  },
  ref
) {
  const containerClasses = label ? "flex items-center" : "inline-flex";
  const content = (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex rounded-full border-t-transparent border-current border-solid border-opacity-80 text-current animate-spin",
        spinnerSizeClasses[size],
        variantTextColors[variant]
      )}
    />
  );

  return (
    <div
      ref={ref}
      role="status"
      aria-label={label ?? "Loading"}
      className={cn(containerClasses, label && labelPosition === "right" && "gap-8", label && labelPosition === "bottom" && "flex-col gap-8", className)}
      {...props}
    >
      {content}
      {label ? (
        <Small as="span" color="soft" className="text-text-soft">
          {label}
        </Small>
      ) : null}
    </div>
  );
});

Spinner.displayName = "Spinner";

const skeletonShapeClasses: Record<SkeletonShape, string> = {
  rect: "rounded-large",
  circle: "rounded-full",
  text: "rounded-large"
};

const skeletonSizeClasses: Record<SkeletonSize, string> = {
  xs: "h-12",
  sm: "h-14",
  md: "h-16",
  lg: "h-20"
};

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  {
    size = "md",
    shape = "rect",
    width,
    height,
    animated = true,
    className,
    ...props
  },
  ref
) {
  const styles: React.CSSProperties = {};

  if (width) {
    styles.width = width;
  }

  if (shape === "circle") {
    styles.height = width || undefined;
  } else if (height) {
    styles.height = height;
  }

  return (
    <span
      ref={ref}
      role="status"
      aria-live="polite"
      aria-label="Loading content"
      className={cn(
        "block bg-background-elevated text-transparent",
        skeletonShapeClasses[shape],
        shape === "circle" ? "aspect-square" : skeletonSizeClasses[size],
        animated && "animate-pulse",
        className
      )}
      style={styles}
      {...props}
    />
  );
});

Skeleton.displayName = "Skeleton";

export const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(function LoadingOverlay(
  {
    active = false,
    label = "Loading",
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <div ref={ref} className={cn("relative", className)} {...props} aria-busy={active || undefined}>
      {children}
      {active ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-overlay text-text">
          <div className="inline-flex flex-col items-center gap-12 rounded-large bg-surface-raised/95 p-24 shadow-medium backdrop-blur-sm">
            <Spinner size="md" variant="primary" label={label} />
          </div>
        </div>
      ) : null}
    </div>
  );
});

LoadingOverlay.displayName = "LoadingOverlay";

export const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(function ProgressCircle(
  {
    value,
    max = 100,
    size = "md",
    variant = "primary",
    label,
    showValue = true,
    ariaLabel,
    className,
    ...props
  },
  ref
) {
  const boundedValue = Math.max(0, Math.min(value, max));
  const progress = max > 0 ? boundedValue / max : 0;
  const dimension = progressCircleSize[size];
  const strokeWidth = progressCircleStroke[size];
  const radius = (dimension - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-label={ariaLabel ?? label ?? "Progress"}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={boundedValue}
      className={cn("inline-flex flex-col items-center justify-center", className)}
      {...props}
    >
      <svg width={dimension} height={dimension} className="overflow-visible">
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
          opacity="0.2"
        />
        <motion.circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          stroke={variantStrokeColors[variant]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          initial={{ strokeDashoffset: circumference }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
        />
      </svg>
      {label || showValue ? (
        <Body as="span" color="soft" className="mt-8 text-center">
          {label ?? `${Math.round(progress * 100)}%`}
        </Body>
      ) : null}
    </div>
  );
});

ProgressCircle.displayName = "ProgressCircle";

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  {
    value,
    max = 100,
    variant = "primary",
    size = "md",
    label,
    showValue = true,
    indeterminate = false,
    width = "100%",
    className,
    ...props
  },
  ref
) {
  const boundedValue = value === undefined ? 0 : Math.max(0, Math.min(value, max));
  const progress = max > 0 ? boundedValue / max : 0;

  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {label ? (
        <div className="mb-8 flex items-center justify-between">
          <Body>{label}</Body>
          {showValue && value !== undefined ? (
            <Small as="span" color="soft">
              {Math.round((progress * 100) || 0)}%
            </Small>
          ) : null}
        </div>
      ) : null}
      <div className={cn("relative overflow-hidden rounded-large bg-background-elevated", progressBarHeight[size])} style={{ width }}>
        <motion.div
          className={cn("h-full bg-current", variantFillColors[variant])}
          initial={false}
          animate={indeterminate ? { x: ["-100%", "100%"] } : { width: `${progress * 100}%` }}
          transition={indeterminate ? { duration: 1.2, repeat: Infinity, ease: "linear" } : { duration: 0.5, ease: "easeOut" }}
          style={indeterminate ? { width: "25%" } : undefined}
        />
      </div>
      {!label && showValue && value !== undefined ? (
        <Small as="span" color="soft" className="mt-8 block text-right">
          {Math.round(progress * 100)}%
        </Small>
      ) : null}
    </div>
  );
});

ProgressBar.displayName = "ProgressBar";
