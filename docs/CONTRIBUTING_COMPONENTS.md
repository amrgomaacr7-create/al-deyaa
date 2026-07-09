# Contributing Components

This guide defines the required workflow for adding future components to the Al-Deyaa shared UI system.

## Before Building

Confirm the component belongs in `src/shared/ui/`.

Shared UI is appropriate when:

- The component is reusable across multiple features.
- The component has no business logic.
- The component does not import from `features/`.
- The component expresses design system behavior.

Feature-specific UI belongs inside `src/features/`.

## Required Component Shape

Every component must include:

- A named component export.
- An exported props type.
- `className?: string`.
- Token-based variants.
- `cn()` for class merging.
- `forwardRef` when applicable.
- Accessibility behavior appropriate to the component role.

## Recommended Folder Structure

```txt
src/shared/ui/component-name/
├── component-name.tsx
├── component-name.types.ts
├── component-name.test.tsx
└── index.ts
```

Use kebab-case for folders and files. Use PascalCase for exported React components.

## Implementation Steps

1. Define the public props type.
2. Choose the semantic HTML element.
3. Map props to token-backed classes.
4. Compose classes with `cn()`.
5. Add `forwardRef` if consumers may need the underlying element.
6. Add accessibility states and ARIA only where needed.
7. Export the component and props type from the component `index.ts`.
8. Re-export from `src/shared/ui/index.ts` only when the API is stable.

## Props Rules

- Keep props minimal.
- Prefer `variant`, `size`, `colorScheme`, `radius`, `orientation`, and `align` from shared types.
- Prefer semantic booleans such as `loading`, `disabled`, `invalid`, and `required`.
- Do not expose raw implementation details as public props.
- Do not expose arbitrary color, spacing, radius, or shadow values.

## Styling Rules

- Use Tailwind classes backed by design tokens.
- Use CSS variables only when the token is not exposed through Tailwind.
- Use component-private variant maps.
- Avoid inline styles for design values.
- Avoid arbitrary Tailwind values unless they reference a token.

## Accessibility Requirements

Every component contribution must document or test:

- Keyboard behavior.
- Focus behavior.
- Screen reader semantics.
- Disabled behavior when applicable.
- Loading behavior when applicable.
- Reduced motion behavior when animation is present.

## Server Component Policy

Components are Server Components by default.

Add `"use client"` only for:

- State.
- Effects.
- Browser APIs.
- Event-driven interactions.
- Imperative focus management.
- Client-only animation behavior.

If possible, split client behavior into a small child component.

## Review Checklist

Before opening a component for review:

- No `any` is used.
- Props type is exported.
- `className` is supported.
- `cn()` is used.
- Tokens are used for all design values.
- No feature imports exist.
- Component is tree-shakable.
- Accessibility behavior is covered.
- Light and dark themes are supported.
- Reduced motion is respected where applicable.

## Anti-Patterns

Do not:

- Build feature logic into shared UI.
- Import from `src/features/`.
- Hardcode brand colors or spacing.
- Add one-off variants for a single page.
- Hide accessibility issues with ARIA.
- Make every component a Client Component by default.
- Export internal implementation maps.
- Create visual duplicates of existing primitives.
