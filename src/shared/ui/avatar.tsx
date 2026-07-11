import { createContext, forwardRef, useContext, useMemo, useState, type HTMLAttributes, type ImgHTMLAttributes, type ReactNode, type SyntheticEvent } from "react";

import { cn } from "./cn";
import { Inline } from "./layout";
import { Body } from "./typography";
import type { WithClassName } from "./types";
import type { SpacingToken } from "@/styles/tokens";

export type AvatarSize = "xs" | "sm" | "md" | "lg";
export type AvatarPresence = "online" | "away" | "busy" | "offline";
export type AvatarVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral";

export type AvatarProps = HTMLAttributes<HTMLSpanElement> &
  WithClassName & {
    size?: AvatarSize;
    className?: string;
    children?: ReactNode;
  };

export type AvatarImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "className"> &
  WithClassName & {
    className?: string;
  };

export type AvatarFallbackProps = HTMLAttributes<HTMLSpanElement> &
  WithClassName & {
    className?: string;
    children: ReactNode;
  };

export type AvatarGroupProps = HTMLAttributes<HTMLDivElement> &
  WithClassName & {
    children?: ReactNode;
    gap?: SpacingToken;
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "between";
  };

export type OnlineIndicatorProps = HTMLAttributes<HTMLSpanElement> &
  WithClassName & {
    variant?: AvatarVariant;
    size?: "xs" | "sm" | "md";
    label?: string;
  };

type AvatarContextType = {
  hasLoaded: boolean;
  hasError: boolean;
  onLoad: () => void;
  onError: () => void;
};

const AvatarContext = createContext<AvatarContextType | null>(null);

const sizeStyles: Record<AvatarSize, string> = {
  xs: "h-24 w-24 text-small",
  sm: "h-32 w-32 text-body",
  md: "h-40 w-40 text-body-large",
  lg: "h-48 w-48 text-h3"
};

const indicatorSizeStyles: Record<NonNullable<OnlineIndicatorProps["size"]>, string> = {
  xs: "h-8 w-8",
  sm: "h-10 w-10",
  md: "h-12 w-12"
};

const presenceColors: Record<AvatarVariant, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-text-soft"
};

const groupBaseClasses = "inline-flex items-center";

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  {
    size = "md",
    className,
    children,
    ...props
  },
  ref
) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const contextValue = useMemo<AvatarContextType>(
    () => ({
      hasLoaded,
      hasError,
      onLoad: () => {
        setHasLoaded(true);
        setHasError(false);
      },
      onError: () => {
        setHasError(true);
        setHasLoaded(false);
      }
    }),
    [hasLoaded, hasError]
  );

  return (
    <AvatarContext.Provider value={contextValue}>
      <span
        ref={ref}
        {...props}
        className={cn(
          "relative inline-flex overflow-hidden rounded-full border border-border bg-surface text-text",
          sizeStyles[size],
          className
        )}
      >
        {children}
      </span>
    </AvatarContext.Provider>
  );
});

Avatar.displayName = "Avatar";

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  function AvatarImage({ className, onLoad, onError, ...props }, ref) {
    const context = useContext(AvatarContext);

    const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
      context?.onLoad();
      onLoad?.(event);
    };

    const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
      context?.onError();
      onError?.(event);
    };

    const isHidden = context ? context.hasError : false;
    const isTransparent = context ? !context.hasLoaded && !context.hasError : false;

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={ref}
        {...props}
        alt={props.alt ?? ""}
        className={cn(
          "h-full w-full object-cover",
          isHidden && "hidden",
          isTransparent && "opacity-0",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    );
  }
);

AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  function AvatarFallback({ className, children, ...props }, ref) {
    const context = useContext(AvatarContext);
    const shouldRender = context ? !context.hasLoaded || context.hasError : true;

    if (!shouldRender) {
      return null;
    }

    return (
      <span
        ref={ref}
        {...props}
        className={cn(
          "flex h-full w-full items-center justify-center bg-background text-center text-text-soft",
          className
        )}
      >
        <Body as="span" weight="semibold" className="truncate">
          {children}
        </Body>
      </span>
    );
  }
);

AvatarFallback.displayName = "AvatarFallback";

export function AvatarGroup({
  gap = 8,
  align = "center",
  justify = "start",
  className,
  children,
  ...props
}: AvatarGroupProps) {
  return (
    <Inline {...props} gap={gap} align={align} justify={justify} className={cn(groupBaseClasses, className)}>
      {children}
    </Inline>
  );
}

AvatarGroup.displayName = "AvatarGroup";

export const OnlineIndicator = forwardRef<HTMLSpanElement, OnlineIndicatorProps>(
  function OnlineIndicator(
    {
      variant = "success",
      size = "sm",
      label = "Online",
      className,
      ...props
    },
    ref
  ) {
    return (
      <span
        ref={ref}
        {...props}
        role="status"
        aria-label={label}
        className={cn(
          "inline-flex items-center justify-center rounded-full border-2 border-surface shadow-soft",
          indicatorSizeStyles[size],
          presenceColors[variant],
          className
        )}
      >
        <span className="sr-only">{label}</span>
      </span>
    );
  }
);

OnlineIndicator.displayName = "OnlineIndicator";
