import { createElement, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "./cn";

type HelperTextProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function HelperText({ className, children, ...props }: HelperTextProps) {
  return createElement(
    "div",
    {
      ...props,
      className: cn("text-caption text-text-soft", className)
    },
    children
  );
}
