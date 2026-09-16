import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Spectral } from 'next/font/google'
import './globals.css'
import { ALLOW_INDEXING, SHARE_DESCRIPTION, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/site'
import { BRUSH_MODEL_URL, ENVIRONMENT_URL, LOADER_SCRIPT, SCENE_SHOWN_MEDIA } from '@/lib/sceneLoading'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-spectral',
  display: 'swap',
})

export const viewport: Viewport = { themeColor: '#7B2121' }

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  authors: [{ name: 'Chinese Culture Club at Santa Monica College' }],
  robots: ALLOW_INDEXING ? { index: true, follow: true } : { index: false, follow: false },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  // og:image / twitter:image come from app/opengraph-image.jpg and
  // app/twitter-image.jpg: a capture of the hero with the dated CTA, rail and
  // nav links hidden. Re-capture if the hero changes.
  openGraph: {
    type: 'website',
    siteName: 'Chinese Culture Club at SMC',
    title: SITE_TITLE,
    description: SHARE_DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SHARE_DESCRIPTION,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${spectral.variable}`} suppressHydrationWarning>
      <head>
        {/* Before first paint: decides whether the desktop loading cover shows. */}
        <script dangerouslySetInnerHTML={{ __html: LOADER_SCRIPT }} />
        {/* Start the brush downloads with the HTML instead of after three.js boots. */}
        <link rel="preload" href={BRUSH_MODEL_URL} as="fetch" crossOrigin="anonymous" media={SCENE_SHOWN_MEDIA} />
        <link rel="preload" href={ENVIRONMENT_URL} as="fetch" crossOrigin="anonymous" media={SCENE_SHOWN_MEDIA} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        {/*
          Cloudflare Web Analytics. Installed by hand because the DNS records
          are DNS-only (grey cloud) so GitHub can answer Let's Encrypt's
          HTTP-01 challenge — traffic never passes through Cloudflare's proxy,
          so there is nothing to auto-inject the beacon. The token is public by
          design; it ships in the page source.

          Cookieless: it sets no cookies and stores nothing on the device, so
          the site needs NO cookie consent banner. Don't add one for this.
        */}
        <script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "683d2fc56f474e17a122a4c28e8ec52d"}'
        />
      </body>
    </html>
  )
}
