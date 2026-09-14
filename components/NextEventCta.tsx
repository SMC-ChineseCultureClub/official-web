'use client'

import { formatDate, upcoming } from '@/lib/events'
import { useToday } from '@/lib/useToday'

const INSTAGRAM = 'https://www.instagram.com/smc.ccc_/'

/** Hero CTA: the next event (same source as the Events feature card), or Instagram when nothing is scheduled. */
export default function NextEventCta({ buildDate }: { buildDate: string }) {
  const { feature } = upcoming(useToday(buildDate))

  if (!feature) {
    return (
      <a className="hero__cta" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
        Follow us on Instagram <span aria-hidden="true">→</span>
      </a>
    )
  }

  const d = formatDate(feature.date!)
  return (
    <a className="hero__cta" href="#events" data-smooth-scroll>
      <span className="hero__cta-kicker">Next up</span>
      {feature.title} · {d.monthShort} {Number(d.day)} <span aria-hidden="true">→</span>
    </a>
  )
}
