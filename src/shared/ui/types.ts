import type { ElementType, ReactNode } from "react";

import type { RadiusToken, ShadowToken, SpacingToken } from "@/styles/tokens";

export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ComponentVariant =
  | "solid"
  | "soft"
  | "outline"
  | "ghost"
  | "plain";

export type ColorScheme =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

export type LoadingState = "idle" | "loading" | "success" | "error";

export type Orientation = "horizontal" | "vertical";

export type Alignment = "start" | "center" | "end" | "stretch";

export type Justification = "start" | "center" | "end" | "between";

export type TextAlignment = "start" | "center" | "end";

export type PolymorphicAs = ElementType;

export type WithClassName = {
  className?: string;
};

export type WithChildren = {
  children?: ReactNode;
};

export type WithPolymorphicAs<TElement extends PolymorphicAs = PolymorphicAs> = {
  as?: TElement;
};

export type WithSize = {
  size?: ComponentSize;
};

export type WithVariant = {
  variant?: ComponentVariant;
};

export type WithColorScheme = {
  colorScheme?: ColorScheme;
};

export type WithRadius = {
  radius?: RadiusToken;
};

export type WithShadow = {
  shadow?: ShadowToken;
};

export type WithSpacing = {
  spacing?: SpacingToken;
};

export type WithOrientation = {
  orientation?: Orientation;
};

export type WithLoadingState = {
  loadingState?: LoadingState;
};

export type InteractiveState = {
  disabled?: boolean;
  loading?: boolean;
};

export type ValidationState = {
  invalid?: boolean;
  required?: boolean;
};

export type DataState =
  | "closed"
  | "open"
  | "checked"
  | "unchecked"
  | "selected"
  | "active"
  | "inactive"
  | "disabled"
  | "loading";

export type TokenRadius = RadiusToken;
export type TokenShadow = ShadowToken;
export type TokenSpacing = SpacingToken;
