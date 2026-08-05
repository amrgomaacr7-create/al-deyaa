export const shadowTokens = {
  soft: "0 1px 2px rgb(17 24 39 / 6%), 0 1px 3px rgb(17 24 39 / 8%)",
  medium: "0 8px 24px rgb(17 24 39 / 10%)",
  large: "0 18px 48px rgb(17 24 39 / 14%)",
  floating: "0 22px 70px rgb(17 24 39 / 18%)",
  modal: "0 28px 90px rgb(17 24 39 / 24%)"
} as const;

export type ShadowToken = keyof typeof shadowTokens;
