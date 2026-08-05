export const durationTokens = {
  fast: "120ms",
  normal: "200ms",
  slow: "320ms"
} as const;

export const easingTokens = {
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  emphasized: "cubic-bezier(0.16, 1, 0.3, 1)",
  focus: "cubic-bezier(0.2, 0, 0, 1)"
} as const;

export const motionTokens = {
  hover: {
    duration: durationTokens.fast,
    easing: easingTokens.standard
  },
  pageTransition: {
    duration: durationTokens.slow,
    easing: easingTokens.emphasized
  },
  modalAnimation: {
    duration: durationTokens.normal,
    easing: easingTokens.emphasized
  },
  focusAnimation: {
    duration: durationTokens.fast,
    easing: easingTokens.focus
  }
} as const;

export type MotionToken = keyof typeof motionTokens;
