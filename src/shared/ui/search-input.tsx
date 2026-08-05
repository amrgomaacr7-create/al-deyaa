import {
  forwardRef,
  type ReactNode,
} from "react";

import { Input, type InputProps } from "./input";

type SearchInputProps = Omit<InputProps, "leftIcon" | "type"> & {
  searchIcon?: ReactNode;
  onClear?: () => void;
};

const defaultSearchIcon = (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      searchIcon = defaultSearchIcon,
      placeholder = "Search...",
      clearable = true,
      onClear,
      ...props
    },
    ref
  ) {
    const handleClear = () => {
      if (ref && typeof ref !== "function") {
        const input = ref.current;
        if (input) {
          input.value = "";
          input.focus();
          const event = new Event("change", { bubbles: true });
          input.dispatchEvent(event);
          onClear?.();
        }
      }
    };

    return (
      <Input
        ref={ref}
        clearable={clearable}
        leftIcon={searchIcon}
        placeholder={placeholder}
        type="search"
        onClear={handleClear}
        {...props}
      />
    );
  }
);

SearchInput.displayName = "SearchInput";
