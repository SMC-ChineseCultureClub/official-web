'use client'

import { useEffect, useRef } from 'react'
import { formatDate, generalMeetings, upcoming, type ClubEvent, type Row } from '@/lib/events'
import { useToday } from '@/lib/useToday'

const INSTAGRAM = 'https://www.instagram.com/smc.ccc_/'

function Title({ title, em }: { title: string; em?: string }) {
  const i = em ? title.indexOf(em) : -1
  if (!em || i < 0) return <>{title}</>
  return (
    <>
      {title.slice(0, i)}
      <em>{em}</em>
      {title.slice(i + em.length)}
    </>
  )
}

function Feature({ event }: { event: ClubEvent }) {
  const d = formatDate(event.date!)
  return (
    <article className={event.photo ? 'events-feature' : 'events-feature events-feature--text'}>
      {event.photo && (
        <div className="events-feature__img">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
          <img src={event.photo} alt="" />
        </div>
      )}
      <div className="events-feature__body">
        <p className="events-feature__tag">
          Next up{event.tag && <> &nbsp;·&nbsp; {event.tag}</>}
        </p>
        <h3 className="events-feature__title">
          <Title title={event.title} em={event.em} />
        </h3>
        {event.titleCn && <p className="events-feature__cn">{event.titleCn}</p>}
        {event.description && <p className="events-feature__copy">{event.description}</p>}
        <div className="events-feature__meta">
          <div><span className="v">{d.weekday} · {d.monthShort} {Number(d.day)}</span>{event.time}</div>
          <div><span className="v">{event.where}</span>{event.whereNote}</div>
          <div><span className="v">Free</span>Just walk in</div>
        </div>
        {event.href && (
          <a className="btn-ghost" href={event.href}>
            Details <span className="arrow"></span>
          </a>
        )}
      </div>
    </article>
  )
}

function EventRow({ row }: { row: Row }) {
  let date: { day: string; mon: string }
  let title: React.ReactNode
  let sub: React.ReactNode = null
  let where: string
  let when: string
  let href: string | undefined

  if (row.kind === 'meetings') {
    const next = formatDate(row.next)
    date = { day: next.weekday, mon: 'Every other' }
    title = <Title title={generalMeetings.title} em={generalMeetings.em} />
    sub = `${row.next === generalMeetings.from ? 'Starting' : 'Next'} ${next.monthShort} ${Number(next.day)}`
    where = generalMeetings.where
    when = generalMeetings.time
  } else {
    const e = row.event
    const d = e.date ? formatDate(e.date) : null
    date = d ? { day: d.day, mon: d.month } : { day: '—', mon: 'Date TBA' }
    title = <Title title={e.title} em={e.em} />
    sub = e.tag ?? null
    where = e.whereNote ? `${e.where} · ${e.whereNote}` : e.where
    when = e.time ?? 'TBA'
    href = e.href
  }

  const body = (
    <>
      <div className="event__date"><span className="day">{date.day}</span><span className="mon">{date.mon}</span></div>
      <div>
        <h4 className="event__title">{title}</h4>
        {sub && <span className="event__sub">{sub}</span>}
      </div>
      <div className="event__info">
        <div className="event__meta"><span className="label">Where</span>{where}</div>
        <div className="event__meta"><span className="label">When</span>{when}</div>
      </div>
      <span className="event__cta" aria-hidden="true">{href ? '↗' : ''}</span>
    </>
  )

  return href ? <a className="event" href={href}>{body}</a> : <div className="event">{body}</div>
}

/**
 * The feature card and list, filtered to what hasn't happened yet. The static
 * export renders them as of build day; once mounted it re-filters against the
 * visitor's actual date, so a stale deploy never advertises a past event.
 */
export default function EventsBoard({ buildDate }: { buildDate: string }) {
  const today = useToday(buildDate)
  const { feature, rows } = upcoming(today)

  // The list's top rule and the rule under each row draw themselves in, like a
  // brush stroke, the first time they scroll into view. Re-run when the rows
  // change with the date.
  const listRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-drawn')
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.6 },
    )
    if (!list.classList.contains('is-drawn')) io.observe(list)
    list.querySelectorAll('.event:not(.is-drawn)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [today])

  if (!feature && !rows.length) {
    return (
      <p className="events-empty">
        Nothing on the calendar right now. Follow{' '}
        <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">@smc.ccc_</a> for what&apos;s next.
      </p>
    )
  }

  return (
    <>
      {feature && <Feature event={feature} />}
      {rows.length > 0 && (
        <div className="events-list" ref={listRef}>
          {rows.map((row) => (
            <EventRow key={row.kind === 'meetings' ? 'meetings' : row.event.id} row={row} />
          ))}
        </div>
      )}
    </>
  )
}
