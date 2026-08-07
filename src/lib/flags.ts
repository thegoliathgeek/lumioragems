/**
 * Site-wide flags.
 *
 * COMING_SOON takes the whole site off the air:
 *   - middleware rewrites every page request to /coming-soon,
 *   - the /api routes answer 503,
 *   - the chrome (header, footer, currency switcher) is left out of the layout,
 *   - robots and the sitemap expose the holding page and nothing else.
 *
 * Nothing is deleted — the shop, journal and custom sections stay in the tree
 * exactly as they are. Set NEXT_PUBLIC_COMING_SOON=false to put the site back.
 */
export const COMING_SOON = process.env.NEXT_PUBLIC_COMING_SOON !== "false";

/** The one route that stays reachable while the site is held back. */
export const COMING_SOON_PATH = "/coming-soon";
