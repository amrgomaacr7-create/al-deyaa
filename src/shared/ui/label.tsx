import { createElement, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "./cn";

type LabelProps = HTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
  required?: boolean;
  disabled?: boolean;
};

export function Label({
  required = false,
  disabled = false,
  className,
  children,
  ...props
}: LabelProps) {
  return createElement(
    "label",
    {
      ...props,
      className: cn(
        "text-small font-medium text-text transition-colors duration-fast ease-standard",
        disabled && "text-disabled",
        className
      )
    },
    <>
      {children}
      {required && <span className="ml-4 text-danger">*</span>}
    </>
  );
}
