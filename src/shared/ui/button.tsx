import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref
} from "react";

import { cn } from "./cn";
import { Inline } from "./layout";
import { Small, Body } from "./typography";
import type { ColorScheme, ComponentSize, WithClassName } from "./types";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link" | ColorScheme;
type ButtonSize = ComponentSize | "icon";

type SlotProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  forwardedRef?: Ref<HTMLElement>;
  slottedContent?: ReactNode;
};

type SlottableProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  className?: string;
  ref?: Ref<HTMLElement>;
};

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> &
  WithClassName & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    iconOnly?: boolean;
    loading?: boolean;
    loadingLabel?: string;
    fullWidth?: boolean;
    asChild?: boolean;
    disabled?: boolean;
  };

const baseClasses = [
  "group inline-flex shrink-0 select-none items-center justify-center rounded-medium border font-medium",
  "[&_[data-button-text]]:text-inherit",
  "transition-[background-color,border-color,color,box-shadow] duration-fast ease-standard",
  "motion-reduce:transition-none",
  "disabled:cursor-not-allowed disabled:border-border disabled:bg-disabled disabled:text-muted",
  "aria-disabled:cursor-not-allowed aria-disabled:border-border aria-disabled:bg-disabled aria-disabled:text-muted",
  "aria-busy:cursor-wait"
];

const variantClasses = {
  primary: "border-primary bg-primary text-surface-raised hover:bg-primary-hover active:bg-primary-hover",
  secondary:
    "border-secondary bg-secondary text-surface-raised hover:bg-secondary-hover active:bg-secondary-hover",
  outline:
    "border-border bg-surface text-text hover:border-border-strong hover:bg-background-elevated active:bg-background-elevated",
  ghost:
    "border-transparent bg-transparent text-text-soft hover:bg-background-elevated hover:text-text active:bg-background-elevated",
  link: "border-transparent bg-transparent text-primary underline hover:text-primary-hover active:text-primary-hover",
  success: "border-success bg-success text-surface-raised hover:shadow-soft active:shadow-soft",
  warning:
    "border-warning bg-accent-muted text-text hover:border-warning hover:shadow-soft active:shadow-soft",
  danger: "border-danger bg-danger text-surface-raised hover:shadow-soft active:shadow-soft",
  accent:
    "border-accent bg-accent-muted text-text hover:border-accent hover:shadow-soft active:shadow-soft",
  info: "border-info bg-info text-surface-raised hover:shadow-soft active:shadow-soft",
  neutral:
    "border-border-strong bg-surface-raised text-text hover:bg-background-elevated active:bg-background-elevated"
} as const satisfies Record<ButtonVariant, string>;

const sizeClasses = {
  xs: "min-h-24 px-8 py-4",
  sm: "min-h-32 px-12 py-8",
  md: "min-h-40 px-16 py-8",
  lg: "min-h-48 px-20 py-12",
  xl: "min-h-64 px-24 py-16",
  icon: "size-40 p-4"
} as const satisfies Record<ButtonSize, string>;

const iconClasses = {
  xs: "size-12",
  sm: "size-16",
  md: "size-16",
  lg: "size-20",
  xl: "size-24",
  icon: "size-20"
} as const satisfies Record<ButtonSize, string>;

const contentGap = {
  xs: 4,
  sm: 8,
  md: 8,
  lg: 12,
  xl: 12,
  icon: 4
} as const satisfies Record<ButtonSize, 4 | 8 | 12>;

function Slot({ children, className, forwardedRef, slottedContent, ...props }: SlotProps) {
  const child = Children.only(children);

  if (!isValidElement<{ className?: string }>(child)) {
    return null;
  }

  const slottableChild = child as ReactElement<SlottableProps>;

  return cloneElement(slottableChild, {
    ...props,
    ref: forwardedRef,
    className: cn(slottableChild.props.className, className),
    children: slottedContent ?? slottableChild.props.children
  });
}

function LoadingSpinner({ className }: WithClassName) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "motion-safe:animate-spin motion-reduce:animate-none [animation-duration:var(--duration-slow)]",
        className
      )}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="text-current" cx="12" cy="12" r="10" stroke="currentColor" />
      <path className="text-current" d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" />
    </svg>
  );
}

function ButtonText({ size, children }: { size: ButtonSize; children: ReactNode }) {
  if (size === "xs" || size === "sm") {
    return (
      <Small as="span" data-button-text="" color="default" weight="medium" truncate>
        {children}
      </Small>
    );
  }

  return (
    <Body as="span" data-button-text="" color="default" weight="medium" truncate>
      {children}
    </Body>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    iconOnly = false,
    loading = false,
    loadingLabel = "Loading",
    fullWidth = false,
    asChild = false,
    disabled = false,
    className,
    children,
    type = "button",
    "aria-label": ariaLabel,
    "aria-disabled": ariaDisabled,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;
  const isIconOnly = iconOnly || size === "icon";
  const accessibleLabel = isIconOnly ? ariaLabel ?? loadingLabel : ariaLabel;
  const content = (
    <Inline as="span" gap={contentGap[size]} align="center" justify="center" wrap={false}>
      {loading ? (
        <LoadingSpinner className={iconClasses[size]} />
      ) : (
        leftIcon && (
          <span aria-hidden="true" className={cn("shrink-0", iconClasses[size])}>
            {leftIcon}
          </span>
        )
      )}

      {!isIconOnly && children ? <ButtonText size={size}>{children}</ButtonText> : null}
      {isIconOnly && children ? <span className="sr-only">{children}</span> : null}

      {!loading && rightIcon && !isIconOnly ? (
        <span aria-hidden="true" className={cn("shrink-0", iconClasses[size])}>
          {rightIcon}
        </span>
      ) : null}
    </Inline>
  );

  if (asChild) {
    return (
      <Slot
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || ariaDisabled || undefined}
        aria-label={accessibleLabel}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          isDisabled && "pointer-events-none",
          className
        )}
        data-loading={loading || undefined}
        forwardedRef={ref as Ref<HTMLElement>}
        slottedContent={content}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      aria-busy={loading || undefined}
      aria-label={accessibleLabel}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      data-loading={loading || undefined}
      disabled={isDisabled}
      ref={ref}
      type={type}
      {...props}
    >
      {content}
    </button>
  );
});
