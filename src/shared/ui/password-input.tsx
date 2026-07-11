import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "./cn";
import type { InputSize, InputState, InputVariant } from "./input";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "disabled" | "type" | "size"> & {
  variant?: InputVariant;
  size?: InputSize;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  loading?: boolean;
  showToggleIcon?: boolean;
  visibleIcon?: ReactNode;
  hiddenIcon?: ReactNode;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      showToggleIcon = true,
      visibleIcon,
      hiddenIcon,
      disabled = false,
      readonly = false,
      variant: _variant,
      size:  _size,
      state: _state,
      loading: _loading,
      ...props
    },
    ref
  ) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
      setIsVisible((prev) => !prev);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        toggleVisibility();
      }
      props.onKeyDown?.(e);
    };

    return (
      <div className="relative inline-flex w-full flex-col">
        <div
          className={cn(
            "group relative inline-flex items-center rounded-medium border transition-[background-color,border-color,color,box-shadow] duration-fast ease-standard",
            "focus-within:ring-2 focus-within:ring-focus-ring focus-within:ring-offset-1",
            "motion-reduce:transition-none"
          )}
        >
          <input
            ref={ref}
            className={cn(
              "peer w-full bg-transparent px-12 py-8 pr-40 text-body placeholder:text-text-soft",
              "disabled:bg-disabled disabled:text-muted disabled:placeholder:text-muted",
              "[&:read-only]:bg-surface [&:read-only]:cursor-not-allowed",
              "focus:outline-none"
            )}
            disabled={disabled}
            readOnly={readonly}
            type={isVisible ? "text" : "password"}
            {...props}
            onKeyDown={handleKeyDown}
          />

          {showToggleIcon && !disabled && !readonly && (
            <button
              aria-label={isVisible ? "Hide password" : "Show password"}
              className="absolute right-12 inline-flex items-center justify-center text-text-soft hover:text-text"
              onClick={toggleVisibility}
              tabIndex={-1}
              type="button"
            >
              {isVisible
                ? visibleIcon || (
                    <svg
                      aria-hidden="true"
                      className="size-20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )
                : hiddenIcon || (
                    <svg
                      aria-hidden="true"
                      className="size-20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" x2="23" y1="1" y2="23" />
                    </svg>
                  )}
            </button>
          )}
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
