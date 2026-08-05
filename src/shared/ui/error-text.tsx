import { createElement, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "./cn";

type ErrorTextProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function ErrorText({ className, children, ...props }: ErrorTextProps) {
  return createElement(
    "div",
    {
      ...props,
      className: cn("text-caption text-danger", className)
    },
    children
  );
}
