import type { MetadataRoute } from 'next'
import { SHARE_DESCRIPTION, SITE_TITLE } from '@/lib/site'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: 'CCC @ SMC',
    description: SHARE_DESCRIPTION,
    start_url: '/',
    display: 'browser',
    background_color: '#f0e7d3',
    theme_color: '#7B2121',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
