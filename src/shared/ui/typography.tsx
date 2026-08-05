import { createElement, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "./cn";

type TextElement =
  | "p"
  | "span"
  | "div"
  | "strong"
  | "em"
  | "small"
  | "label"
  | "figcaption"
  | "blockquote"
  | "code";

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type TextColor = "default" | "soft" | "muted" | "disabled" | "primary" | "secondary" | "accent";
type TextWeight = "regular" | "medium" | "semibold" | "bold";
type TextAlign = "start" | "center" | "end";

type TypographyBaseProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  color?: TextColor;
  weight?: TextWeight;
  align?: TextAlign;
  truncate?: boolean;
};

type TextProps = TypographyBaseProps & {
  as?: TextElement;
};

type DisplayProps = TypographyBaseProps & {
  as?: HeadingElement | TextElement;
};

type HeadingProps = TypographyBaseProps & {
  as?: HeadingElement;
  level?: 1 | 2 | 3;
};

const colorClasses = {
  default: "text-text",
  soft: "text-text-soft",
  muted: "text-muted",
  disabled: "text-disabled",
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent"
} as const satisfies Record<TextColor, string>;

const weightClasses = {
  regular: "font-regular",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold"
} as const satisfies Record<TextWeight, string>;

const alignClasses = {
  start: "text-start",
  center: "text-center",
  end: "text-end"
} as const satisfies Record<TextAlign, string>;

const headingClasses = {
  1: "text-h1",
  2: "text-h2",
  3: "text-h3"
} as const satisfies Record<NonNullable<HeadingProps["level"]>, string>;

function typographyClassName({
  className,
  color = "default",
  weight,
  align = "start",
  truncate = false
}: Pick<TypographyBaseProps, "align" | "className" | "color" | "truncate" | "weight">) {
  return cn(
    colorClasses[color],
    weight ? weightClasses[weight] : undefined,
    alignClasses[align],
    truncate && "truncate",
    className
  );
}

export function Display({
  as = "h1",
  color,
  weight = "bold",
  align,
  truncate,
  className,
  children,
  ...props
}: DisplayProps) {
  return createElement(
    as,
    {
      ...props,
      className: cn(
        "text-display",
        typographyClassName({ align, className, color, truncate, weight })
      )
    },
    children
  );
}

export function Heading({
  as,
  level = 1,
  color,
  weight = "bold",
  align,
  truncate,
  className,
  children,
  ...props
}: HeadingProps) {
  const component = as ?? (`h${level}` as HeadingElement);

  return createElement(
    component,
    {
      ...props,
      className: cn(
        headingClasses[level],
        typographyClassName({ align, className, color, truncate, weight })
      )
    },
    children
  );
}

export function Title({
  as = "h3",
  color,
  weight = "semibold",
  align,
  truncate,
  className,
  children,
  ...props
}: DisplayProps) {
  return createElement(
    as,
    {
      ...props,
      className: cn("text-h3", typographyClassName({ align, className, color, truncate, weight }))
    },
    children
  );
}

export function Subtitle({
  as = "p",
  color = "soft",
  weight = "regular",
  align,
  truncate,
  className,
  children,
  ...props
}: TextProps) {
  return createElement(
    as,
    {
      ...props,
      className: cn(
        "text-body-large",
        typographyClassName({ align, className, color, truncate, weight })
      )
    },
    children
  );
}

export function Body({
  as = "p",
  color,
  weight = "regular",
  align,
  truncate,
  className,
  children,
  ...props
}: TextProps) {
  return createElement(
    as,
    {
      ...props,
      className: cn("text-body", typographyClassName({ align, className, color, truncate, weight }))
    },
    children
  );
}

export function Small({
  as = "small",
  color = "soft",
  weight = "regular",
  align,
  truncate,
  className,
  children,
  ...props
}: TextProps) {
  return createElement(
    as,
    {
      ...props,
      className: cn("text-small", typographyClassName({ align, className, color, truncate, weight }))
    },
    children
  );
}

export function Caption({
  as = "figcaption",
  color = "muted",
  weight = "medium",
  align,
  truncate,
  className,
  children,
  ...props
}: TextProps) {
  return createElement(
    as,
    {
      ...props,
      className: cn(
        "text-caption",
        typographyClassName({ align, className, color, truncate, weight })
      )
    },
    children
  );
}

export function Code({
  as = "code",
  color = "default",
  weight = "regular",
  align,
  truncate,
  className,
  children,
  ...props
}: TextProps) {
  return createElement(
    as,
    {
      ...props,
      className: cn(
        "font-mono text-small",
        typographyClassName({ align, className, color, truncate, weight })
      )
    },
    children
  );
}
