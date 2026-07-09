# Al-Deyaa Component Guidelines

These rules define how every future shared UI component must be built. The goal is a calm, token-driven, enterprise-grade design system that can evolve for many years without duplication.

## Core Rules

Every shared component must:

- Accept `className`.
- Export its props type from the component file.
- Use `React.forwardRef` when the component renders a focusable element, form element, interactive element, or DOM element that consumers may need to measure or focus.
- Never use `any`.
- Be fully typed with explicit public props.
- Use `cn()` from `src/shared/ui/cn.ts` for class composition.
- Consume design tokens only.
- Never hardcode colors, spacing, radius, shadows, typography, or motion values.
- Be composable before being configurable.
- Be reusable across features.
- Be tree-shakable through named exports.
- Prefer Server Components.
- Use Client Components only when browser APIs, stateful interaction, effects, refs with imperative behavior, or event-driven UI state are required.

## Naming Convention

- Component names use `PascalCase`: `Button`, `TextField`, `CourseProgress`.
- Props types use the component name plus `Props`: `ButtonProps`, `TextFieldProps`.
- Internal helper types should stay local unless multiple components need them.
- Boolean props should read naturally: `disabled`, `loading`, `required`, `invalid`.
- Event props should follow React naming: `onOpenChange`, `onValueChange`, `onDismiss`.
- Avoid vague names such as `type`, `mode`, or `style` when a clearer domain name exists.

## File Structure

Each component should live in its own folder once it grows beyond one file:

```txt
src/shared/ui/component-name/
├── component-name.tsx
├── component-name.types.ts
├── component-name.test.tsx
└── index.ts
```

Small primitive components may start as a single file under `src/shared/ui/`, but should move into a folder when they gain variants, tests, subparts, or documentation.

## Export Convention

- Use named exports only.
- Export the component and its public props type.
- Re-export public API from the component folder `index.ts`.
- Re-export stable shared UI API from `src/shared/ui/index.ts`.
- Do not export internal helpers, variant maps, or implementation details.

Example:

```tsx
export type ExampleProps = {
  className?: string;
};

export const Example = forwardRef<HTMLDivElement, ExampleProps>(function Example(props, ref) {
  return <div ref={ref} {...props} />;
});
```

## Props Convention

Public props should be small, predictable, and token-based.

- Always include `className?: string`.
- Prefer `children?: ReactNode` for composable content.
- Extend native element props when the component maps closely to one element.
- Omit conflicting native props before redefining them.
- Use shared types from `src/shared/ui/types.ts` for `size`, `variant`, `colorScheme`, `radius`, `orientation`, and alignment.
- Avoid passing raw Tailwind classes as formal variant props.
- Avoid large configuration objects unless they model a real repeated pattern.

## Variant Convention

Variants must map to design tokens.

- Use semantic names: `primary`, `secondary`, `accent`, `success`, `warning`, `danger`, `info`, `neutral`.
- Use size names from shared types: `xs`, `sm`, `md`, `lg`, `xl`.
- Variants should describe intent, not visual implementation.
- Variant maps should live beside the component and stay private unless reused.
- Use `cn()` to merge variant classes with consumer `className`.

## Design Token Usage

Components must reference tokens through approved surfaces:

- Tailwind token classes configured in `tailwind.config.ts`.
- CSS custom properties from `src/styles/globals.css`.
- TypeScript token definitions from `src/styles/tokens/`.

Do not use arbitrary values such as `text-[#123456]`, `p-[13px]`, `rounded-[10px]`, or inline style values for design decisions.

Allowed arbitrary values are limited to token references, such as `max-w-[var(--breakpoint-desktop)]`.

## Server And Client Boundaries

Default to Server Components.

Use `"use client"` only when the component needs:

- Browser APIs.
- React state or effects.
- Event handlers for interactive behavior.
- Imperative focus or measurement behavior.
- Animation libraries that require the client runtime.

When only a small subpart needs client behavior, isolate that subpart instead of making the entire component client-side.

## Composition

Prefer composition over prop explosion.

- Use `children` for content.
- Expose subcomponents only when they represent meaningful slots.
- Keep layout primitives separate from domain behavior.
- Shared UI must never import from `features/`.
- Shared UI may depend on `src/styles/tokens`, `src/shared/ui`, and generic utilities only.

## Ref Policy

Use `forwardRef` for components that render:

- Interactive elements.
- Form controls.
- Elements likely to receive focus.
- Elements likely to be measured, scrolled, or animated by consumers.

Do not add refs to purely structural wrappers unless there is a clear use case.

## Testing Expectations

Future components should test:

- Rendered semantic element.
- Accessible name and roles when relevant.
- Keyboard behavior for interactive components.
- Disabled and loading behavior.
- Variant class output at the public behavior level.
- Ref forwarding when applicable.

Tests should not snapshot large class strings unless the class string is the behavior under test.
