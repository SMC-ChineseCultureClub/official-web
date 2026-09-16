// Site-wide settings (docs/launch-plan.md, "域名切换清单"). SITE_URL is already
// the live domain; ALLOW_INDEXING is the one switch still waiting for launch day.
// layout.tsx (robots meta), robots.ts and sitemap.ts all read from here.

export const SITE_URL = 'https://smcccc.com'

/** Gates robots meta, robots.txt and the sitemap together. */
export const ALLOW_INDEXING = true

export const SITE_TITLE = 'Chinese Culture Club — Santa Monica College'

export const SITE_DESCRIPTION =
  'The Chinese Culture Club at Santa Monica College: make friends over calligraphy, crafts, games, and potlucks. Every other Thursday in HSS 252, everyone welcome.'

/** Shorter, for share cards. */
export const SHARE_DESCRIPTION =
  'Make friends over calligraphy, crafts, games, and potlucks. Every other Thursday at SMC, everyone welcome.'
