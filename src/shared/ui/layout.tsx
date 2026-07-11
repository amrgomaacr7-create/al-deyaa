import { createElement, type HTMLAttributes, type ReactNode } from "react";

import type { SpacingToken } from "@/styles/tokens";

import { cn } from "./cn";

type LayoutElement =
  | "div"
  | "section"
  | "main"
  | "article"
  | "aside"
  | "header"
  | "footer"
  | "nav"
  | "span";

type DividerElement = "div" | "hr";

type LayoutBaseProps = HTMLAttributes<HTMLElement> & {
  as?: LayoutElement;
  children?: ReactNode;
};

type Align = "start" | "center" | "end" | "stretch";
type Justify = "start" | "center" | "end" | "between";
type ContainerSize = "tablet" | "laptop" | "desktop" | "ultraWide" | "full";
type GridColumns = 1 | 2 | 3 | 4 | 6 | 12;
type DividerOrientation = "horizontal" | "vertical";

const spacingClasses = {
  4: "gap-4",
  8: "gap-8",
  12: "gap-12",
  16: "gap-16",
  20: "gap-20",
  24: "gap-24",
  32: "gap-32",
  40: "gap-40",
  48: "gap-48",
  64: "gap-64",
  80: "gap-80",
  96: "gap-96"
} as const satisfies Record<SpacingToken, string>;

const paddingInlineClasses = {
  4: "px-4",
  8: "px-8",
  12: "px-12",
  16: "px-16",
  20: "px-20",
  24: "px-24",
  32: "px-32",
  40: "px-40",
  48: "px-48",
  64: "px-64",
  80: "px-80",
  96: "px-96"
} as const satisfies Record<SpacingToken, string>;

const paddingBlockClasses = {
  4: "py-4",
  8: "py-8",
  12: "py-12",
  16: "py-16",
  20: "py-20",
  24: "py-24",
  32: "py-32",
  40: "py-40",
  48: "py-48",
  64: "py-64",
  80: "py-80",
  96: "py-96"
} as const satisfies Record<SpacingToken, string>;

const marginBlockClasses = {
  4: "my-4",
  8: "my-8",
  12: "my-12",
  16: "my-16",
  20: "my-20",
  24: "my-24",
  32: "my-32",
  40: "my-40",
  48: "my-48",
  64: "my-64",
  80: "my-80",
  96: "my-96"
} as const satisfies Record<SpacingToken, string>;

const marginInlineClasses = {
  4: "mx-4",
  8: "mx-8",
  12: "mx-12",
  16: "mx-16",
  20: "mx-20",
  24: "mx-24",
  32: "mx-32",
  40: "mx-40",
  48: "mx-48",
  64: "mx-64",
  80: "mx-80",
  96: "mx-96"
} as const satisfies Record<SpacingToken, string>;

const widthClasses = {
  4: "w-4",
  8: "w-8",
  12: "w-12",
  16: "w-16",
  20: "w-20",
  24: "w-24",
  32: "w-32",
  40: "w-40",
  48: "w-48",
  64: "w-64",
  80: "w-80",
  96: "w-96"
} as const satisfies Record<SpacingToken, string>;

const heightClasses = {
  4: "h-4",
  8: "h-8",
  12: "h-12",
  16: "h-16",
  20: "h-20",
  24: "h-24",
  32: "h-32",
  40: "h-40",
  48: "h-48",
  64: "h-64",
  80: "h-80",
  96: "h-96"
} as const satisfies Record<SpacingToken, string>;

const minHeightClasses = {
  4: "min-h-4",
  8: "min-h-8",
  12: "min-h-12",
  16: "min-h-16",
  20: "min-h-20",
  24: "min-h-24",
  32: "min-h-32",
  40: "min-h-40",
  48: "min-h-48",
  64: "min-h-64",
  80: "min-h-80",
  96: "min-h-96"
} as const satisfies Record<SpacingToken, string>;

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch"
} as const satisfies Record<Align, string>;

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between"
} as const satisfies Record<Justify, string>;

const containerClasses = {
  tablet: "max-w-[var(--breakpoint-tablet)]",
  laptop: "max-w-[var(--breakpoint-laptop)]",
  desktop: "max-w-[var(--breakpoint-desktop)]",
  ultraWide: "max-w-[var(--breakpoint-ultra-wide)]",
  full: "max-w-none"
} as const satisfies Record<ContainerSize, string>;

const gridColumnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  12: "grid-cols-12"
} as const satisfies Record<GridColumns, string>;

type ContainerProps = LayoutBaseProps & {
  size?: ContainerSize;
  padding?: SpacingToken;
};

export function Container({
  as = "div",
  size = "desktop",
  padding = 24,
  className,
  children,
  ...props
}: ContainerProps) {
  return createElement(
    as,
    {
      ...props,
      className: cn("mx-auto w-full", containerClasses[size], paddingInlineClasses[padding], className)
    },
    children
  );
}

type StackProps = LayoutBaseProps & {
  gap?: SpacingToken;
  align?: Align;
  justify?: Justify;
};

export function Stack({
  as = "div",
  gap = 16,
  align = "stretch",
  justify = "start",
  className,
  children,
  ...props
}: StackProps) {
  return createElement(
    as,
    {
      ...props,
      className: cn(
        "flex flex-col",
        spacingClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        className
      )
    },
    children
  );
}

type InlineProps = LayoutBaseProps & {
  gap?: SpacingToken;
  align?: Align;
  justify?: Justify;
  wrap?: boolean;
};

export function Inline({
  as = "div",
  gap = 16,
  align = "center",
  justify = "start",
  wrap = true,
  className,
  children,
  ...props
}: InlineProps) {
  return createElement(
    as,
    {
      ...props,
      className: cn(
        "flex flex-row",
        wrap && "flex-wrap",
        spacingClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        className
      )
    },
    children
  );
}

type GridProps = LayoutBaseProps & {
  columns?: GridColumns;
  gap?: SpacingToken;
};

export function Grid({
  as = "div",
  columns = 1,
  gap = 24,
  className,
  children,
  ...props
}: GridProps) {
  return createElement(
    as,
    {
      ...props,
      className: cn("grid", gridColumnClasses[columns], spacingClasses[gap], className)
    },
    children
  );
}

type SectionProps = LayoutBaseProps & {
  spacing?: SpacingToken;
};

export function Section({
  as = "section",
  spacing = 64,
  className,
  children,
  ...props
}: SectionProps) {
  return createElement(
    as,
    {
      ...props,
      className: cn(paddingBlockClasses[spacing], className)
    },
    children
  );
}

type SpacerProps = HTMLAttributes<HTMLDivElement> & {
  size?: SpacingToken;
  axis?: "horizontal" | "vertical";
};

export function Spacer({ size = 24, axis = "vertical", className, ...props }: SpacerProps) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={cn(
        "shrink-0",
        axis === "vertical" ? heightClasses[size] : widthClasses[size],
        className
      )}
    />
  );
}

type DividerProps = HTMLAttributes<HTMLElement> & {
  as?: DividerElement;
  orientation?: DividerOrientation;
  spacing?: SpacingToken;
};

export function Divider({
  as = "div",
  orientation = "horizontal",
  spacing = 24,
  className,
  ...props
}: DividerProps) {
  return createElement(as, {
    role: as === "hr" ? undefined : "separator",
    "aria-orientation": orientation,
    ...props,
    className: cn(
      "shrink-0 border-border",
      orientation === "horizontal" ? "w-full border-t" : "self-stretch border-l",
      orientation === "horizontal" ? marginBlockClasses[spacing] : marginInlineClasses[spacing],
      className
    )
  });
}

type SeparatorProps = Omit<DividerProps, "as">;

export function Separator({ orientation = "horizontal", spacing = 24, className, ...props }: SeparatorProps) {
  return <Divider as="hr" orientation={orientation} spacing={spacing} className={className} {...props} />;
}

export function HorizontalDivider({ spacing = 24, className, ...props }: Omit<DividerProps, "orientation">) {
  return <Divider orientation="horizontal" spacing={spacing} className={className} {...props} />;
}

export function VerticalDivider({ spacing = 24, className, ...props }: Omit<DividerProps, "orientation">) {
  return <Divider orientation="vertical" spacing={spacing} className={className} {...props} />;
}

type CenterProps = LayoutBaseProps & {
  minHeight?: SpacingToken;
};

export function Center({
  as = "div",
  minHeight,
  className,
  children,
  ...props
}: CenterProps) {
  return createElement(
    as,
    {
      ...props,
      className: cn(
        "flex items-center justify-center",
        minHeight && minHeightClasses[minHeight],
        className
      )
    },
    children
  );
}

type AspectRatioProps = HTMLAttributes<HTMLDivElement> & {
  ratio?: "square" | "video" | "wide" | "portrait";
  children?: ReactNode;
};

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[21/9]",
  portrait: "aspect-[3/4]"
} as const satisfies Record<NonNullable<AspectRatioProps["ratio"]>, string>;

export function AspectRatio({
  ratio = "video",
  className,
  children,
  ...props
}: AspectRatioProps) {
  return (
    <div {...props} className={cn("relative overflow-hidden", aspectRatioClasses[ratio], className)}>
      {children}
    </div>
  );
}
