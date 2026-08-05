# Al-Deyaa Accessibility Guidelines

Accessibility is a baseline requirement for every future component. Components should support students, parents, and the teacher across different devices, assistive technologies, reading preferences, and long study sessions.

## Semantic HTML

- Start with the correct HTML element before adding ARIA.
- Use `button` for actions and links for navigation.
- Use headings in document order.
- Use `fieldset`, `legend`, and `label` for grouped form controls.
- Do not replace native semantics with generic `div` elements unless there is no native element that fits.

## ARIA

- ARIA should enhance semantics, not replace native HTML.
- Use ARIA only when native semantics are insufficient.
- Every interactive element must have an accessible name.
- Components with controlled state should expose the matching ARIA state when applicable: `aria-expanded`, `aria-selected`, `aria-pressed`, `aria-invalid`, or `aria-current`.
- Error text should be connected with `aria-describedby`.
- Required fields should use visible text and `aria-required` only when needed for custom controls.
- Avoid `aria-hidden` on focusable elements.

## Keyboard Navigation

- All interactive controls must be reachable by keyboard.
- Tab order must follow visual and document order.
- Do not trap focus except in modal-like experiences that require it.
- Escape should close dismissible overlays.
- Enter and Space should activate button-like controls.
- Arrow key behavior should follow established WAI-ARIA patterns for menus, tabs, radio groups, sliders, and listboxes.

## Focus Visibility

- Never remove focus outlines without replacing them with a token-based visible focus style.
- Focus indicators must use the focus ring token.
- Focus states must be visible in both light and dark themes.
- Focus should move intentionally after opening, closing, submitting, or dismissing interactive UI.

## Screen Readers

- Decorative content should be hidden with `aria-hidden="true"`.
- Meaningful icons require an accessible label or visible text.
- Loading and error states should be announced when they affect task completion.
- Dynamic status messages should use `role="status"` or `aria-live` only when the update is important.
- Avoid noisy live regions for frequent visual-only changes.

## Disabled State

- Native controls should use the `disabled` attribute when they are not interactive.
- Non-native disabled controls must use `aria-disabled="true"` and prevent interaction manually.
- Disabled state must be visually distinct using disabled tokens.
- Disabled controls should not show misleading hover or active states.
- Explain unavailable actions near the control when the reason is not obvious.

## Loading State

- Loading states must preserve layout stability.
- Controls that start async work should expose busy state with `aria-busy` when appropriate.
- Loading text should be available to assistive technology when the loading state affects the user task.
- Avoid infinite motion that distracts during study sessions.
- Provide reduced-motion alternatives for animated loaders.

## Reduced Motion

- Respect `prefers-reduced-motion`.
- Motion should be subtle, short, and purposeful.
- Avoid animation as the only way to communicate state.
- Components using motion must consume motion tokens.
- Reduced motion should remove or shorten non-essential transitions.

## Color And Contrast

- Do not communicate meaning with color alone.
- Text, icons, borders, and focus states must pass contrast requirements in both themes.
- Use semantic color tokens rather than raw values.
- Disabled content may have lower contrast, but must not be confused with active content.

## Forms And Validation

- Inputs must have programmatic labels.
- Validation errors should be specific and connected to the field.
- Required and optional state should be clear.
- Do not validate only on blur if it creates confusing delayed feedback.
- Preserve user-entered values after validation errors.

## Component Review Checklist

Before a component is accepted, confirm:

- It uses semantic HTML.
- It has a visible focus state.
- It works with keyboard only.
- It has accessible names for interactive controls.
- It does not rely on color alone.
- It supports disabled and loading states when relevant.
- It respects reduced motion.
- It works in light and dark themes.
