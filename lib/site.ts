// Site-wide settings that change together on launch day (docs/launch-plan.md,
// "域名切换清单"): point SITE_URL at the real domain and flip ALLOW_INDEXING.
// layout.tsx (robots meta), robots.ts and sitemap.ts all read from here.

export const SITE_URL = 'https://ccc.peterguan.com'

/** false while the site lives on the preview domain: noindex + robots.txt disallow. */
export const ALLOW_INDEXING = false

export const SITE_TITLE = 'Chinese Culture Club — Santa Monica College'

export const SITE_DESCRIPTION =
  'The Chinese Culture Club at Santa Monica College: make friends over calligraphy, crafts, games, and potlucks. Every other Thursday in HSS 252, everyone welcome.'

/** Shorter, for share cards. */
export const SHARE_DESCRIPTION =
  'Make friends over calligraphy, crafts, games, and potlucks. Every other Thursday at SMC, everyone welcome.'
