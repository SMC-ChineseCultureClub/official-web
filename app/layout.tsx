import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Spectral } from 'next/font/google'
import './globals.css'
import { ALLOW_INDEXING, SHARE_DESCRIPTION, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/site'

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
