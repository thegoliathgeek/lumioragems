/**
 * Design tokens mirrored in TypeScript.
 *
 * `globals.css` is the source of truth for styling; this module exists so
 * non-CSS consumers (SVG gem renderer, OG images, email templates) read the
 * same values instead of inventing their own.
 */

export const palette = {
  ivory: { 50: "#ffffff", 100: "#fbfaf7", 200: "#f2f0e9", 300: "#e6e3da" },
  rose: { 50: "#f2ece9", 100: "#e8ded9", 200: "#dbd0ca", 300: "#c9bbb3", 400: "#b3a199" },
  gold: { 300: "#d8c39b", 400: "#c4a574", 500: "#b08f5e", 600: "#96774a" },
  ink: { 400: "#8a877f", 500: "#6d6a63", 600: "#55534e", 700: "#43413d", 800: "#3a3936", 900: "#2a2926" },
} as const;

export const semantic = {
  surface: palette.ivory[100],
  surfaceRaised: palette.ivory[50],
  surfaceMuted: palette.rose[200],
  accent: palette.gold[500],
  body: palette.ink[600],
  heading: palette.ink[800],
} as const;

/** Per-gem colour ramps used by the SVG gem renderer. */
export const gemColours: Record<string, { light: string; mid: string; deep: string }> = {
  blue: { light: "#8fb4e8", mid: "#3a66b0", deep: "#16305e" },
  teal: { light: "#7fd0c4", mid: "#2b8f88", deep: "#124a49" },
  green: { light: "#a8d4a0", mid: "#4f8f52", deep: "#234a28" },
  yellow: { light: "#f7e09a", mid: "#d9ab3c", deep: "#8a6714" },
  pink: { light: "#f5c2d4", mid: "#d97a9f", deep: "#8c3d5c" },
  padparadscha: { light: "#ffcaa8", mid: "#ee8a5f", deep: "#a9503a" },
  peach: { light: "#fbd8bd", mid: "#e2a279", deep: "#9a6647" },
  champagne: { light: "#f2e3cb", mid: "#c9a97e", deep: "#8a6c46" },
  white: { light: "#ffffff", mid: "#e2e0da", deep: "#a9a69d" },
  violet: { light: "#cdb6ec", mid: "#8055bd", deep: "#432a6e" },
  purple: { light: "#c6a9e0", mid: "#7a4ba8", deep: "#3f2360" },
  ruby: { light: "#f2a3a8", mid: "#c0304a", deep: "#6d1424" },
  aquamarine: { light: "#b8e6ec", mid: "#5aa9bd", deep: "#2a5c6b" },
  default: { light: "#d8c39b", mid: "#b08f5e", deep: "#6b5230" },
};

export function gemRamp(key?: string) {
  if (!key) return gemColours.default;
  return gemColours[key.toLowerCase()] ?? gemColours.default;
}
