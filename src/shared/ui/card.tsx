import { createElement, forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "./cn";
import { Body, Heading } from "./typography";
import type { WithClassName } from "./types";

type CardVariant = "elevated" | "outlined" | "filled" | "ghost";
type CardSize = "sm" | "md" | "lg";

type CardBaseProps = HTMLAttributes<HTMLElement> & WithClassName & {
  children?: ReactNode;
  as?: ElementType;
};

export type CardProps = CardBaseProps & {
  variant?: CardVariant;
  size?: CardSize;
};

type CardSectionProps = HTMLAttributes<HTMLElement> & WithClassName & {
  children?: ReactNode;
  as?: ElementType;
};

type CardTitleProps = Omit<HTMLAttributes<HTMLHeadingElement>, "color"> &
  WithClassName & {
    children: ReactNode;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

type CardDescriptionProps = Omit<HTMLAttributes<HTMLParagraphElement>, "color"> &
  WithClassName & {
    children: ReactNode;
  };

const cardBaseClasses = "w-full overflow-hidden rounded-medium border transition-colors duration-fast ease-standard";

const variantClasses: Record<CardVariant, string> = {
  elevated: "border-border bg-surface-raised shadow-soft",
  outlined: "border-border bg-background",
  filled: "border-transparent bg-background-elevated",
  ghost: "border-transparent bg-transparent"
};

const sizeClasses: Record<CardSize, string> = {
  sm: "p-16",
  md: "p-20",
  lg: "p-24"
};

export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  {
    as = "section",
    variant = "elevated",
    size = "md",
    className,
    children,
    ...props
  },
  ref
) {
  return createElement(
    as,
    {
      ...props,
      ref,
      className: cn(cardBaseClasses, variantClasses[variant], sizeClasses[size], className)
    },
    children
  );
});

export function CardHeader({
  as = "header",
  className,
  children,
  ...props
}: CardSectionProps) {
  return createElement(
    as,
    {
      ...props,
      className: cn("flex flex-col gap-8", className)
    },
    children
  );
}

export function CardTitle({
  as = "h3",
  className,
  children,
  ...props
}: CardTitleProps) {
  return (
    <Heading
      as={as}
      level={3}
      className={cn("text-h3", className)}
      {...props}
    >
      {children}
    </Heading>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: CardDescriptionProps) {
  return (
    <Body as="p" color="soft" className={cn("text-body", className)} {...props}>
      {children}
    </Body>
  );
}

export function CardContent({
  as = "div",
  className,
  children,
  ...props
}: CardSectionProps) {
  return createElement(
    as,
    {
      ...props,
      className: cn("w-full", className)
    },
    children
  );
}

export function CardFooter({
  as = "footer",
  className,
  children,
  ...props
}: CardSectionProps) {
  return createElement(
    as,
    {
      ...props,
      className: cn("mt-20 flex flex-wrap items-center justify-between gap-16", className)
    },
    children
  );
}

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardDescription.displayName = "CardDescription";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";
