/**
 * Theme mode constants for next-themes.
 */
export const THEME = {
  light: "light",
  dark: "dark",
} as const;

export type ThemeMode = (typeof THEME)[keyof typeof THEME];
