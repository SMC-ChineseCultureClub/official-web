// Upcoming events — the single source for the Events section (and, later, any
// "next event" notice elsewhere). Edit this file to update the calendar; past
// entries drop off the page on their own the day after they happen.

export type ClubEvent = {
  id: string
  title: string
  /** Part of `title` set in italics. */
  em?: string
  /** Small line above the feature title, e.g. a collaboration credit. */
  tag?: string
  /** Chinese subtitle — used sparingly. */
  titleCn?: string
  /** `YYYY-MM-DD`, Pacific time. `null` = date not set yet (shown as TBA, listed last). */
  date: string | null
  time?: string
  where: string
  whereNote?: string
  description?: string
  /** Image path under public/. Without one the feature card drops its image column. */
  photo?: string
  /** Where the entry links to. Without one it renders as plain, unclickable text. */
  href?: string
}

export type Recurring = {
  title: string
  em?: string
  /** First occurrence, `YYYY-MM-DD`. */
  from: string
  everyWeeks: number
  /** Last possible occurrence, `YYYY-MM-DD`. */
  until: string
  /** Occurrences that don't happen. */
  skip: string[]
  time: string
  where: string
  whereNote?: string
  description?: string
}

const MEETING_TIME = '11:15 AM — 12:30 PM'
const MEETING_ROOM = 'HSS 252'
const MEETING_BUILDING = 'Humanities & Social Science'

export const events: ClubEvent[] = [
  {
    id: 'first-general-meeting',
    title: 'First General Meeting',
    em: 'First',
    date: '2026-09-17',
    time: MEETING_TIME,
    where: MEETING_ROOM,
    whereNote: MEETING_BUILDING,
    description: 'Get to know the club, and each other, over a few icebreaker games.',
  },
  {
    id: 'mid-autumn-2026',
    title: 'Mid-Autumn Festival',
    em: 'Mid-Autumn',
    tag: 'ISF × CCC',
    titleCn: '中 秋',
    date: '2026-09-24',
    time: '11:15 AM — 12:30 PM',
    where: 'SSC, 3rd floor',
    whereNote: 'The open hall off the elevators',
    description: 'Hosted by the International Student Forum, with CCC.',
  },
  {
    id: 'club-awareness-2026',
    title: 'Club Awareness',
    em: 'Awareness',
    date: '2026-09-29',
    time: '11:00 AM — 1:00 PM',
    where: 'The Quad',
    description:
      'Clubs from across campus set up on the Quad. Find our table for mini games, snacks, and small prizes.',
  },
  {
    id: 'club-row-2026',
    title: 'Club Row',
    em: 'Row',
    date: '2026-10-29',
    time: '11:00 AM — 1:00 PM',
    where: 'The Quad',
    description:
      'Clubs from across campus set up on the Quad. Find our table for mini games, snacks, and small prizes.',
  },
  {
    id: 'potluck-fall-2026',
    title: 'Potluck',
    em: 'Potluck',
    date: null,
    where: 'Clover Park',
  },
]

export const generalMeetings: Recurring = {
  title: 'General Meetings',
  em: 'General',
  from: '2026-10-15',
  everyWeeks: 2,
  until: '2026-12-10', // tentative end of semester
  skip: [
    '2026-10-29', // Club Row instead
    '2026-11-26', // Thanksgiving
  ],
  time: MEETING_TIME,
  where: MEETING_ROOM,
  whereNote: MEETING_BUILDING,
}

/** Today's date in Santa Monica, as `YYYY-MM-DD`. */
export function pacificToday(now = new Date()): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(now)
}

const DAY_MS = 86_400_000
const toUtc = (iso: string) => Date.parse(`${iso}T00:00:00Z`)
const toIso = (ms: number) => new Date(ms).toISOString().slice(0, 10)

export function occurrences(r: Recurring): string[] {
  const out: string[] = []
  for (let t = toUtc(r.from); t <= toUtc(r.until); t += r.everyWeeks * 7 * DAY_MS) {
    const iso = toIso(t)
    if (!r.skip.includes(iso)) out.push(iso)
  }
  return out
}

export function formatDate(iso: string) {
  const d = new Date(toUtc(iso))
  const f = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...o }).format(d)
  return {
    weekday: f({ weekday: 'short' }), // Thu
    day: f({ day: '2-digit' }),       // 07
    month: f({ month: 'long' }),      // September
    monthShort: f({ month: 'short' }), // Sep
  }
}

export type Row =
  | { kind: 'event'; event: ClubEvent }
  /** The recurring meetings, collapsed into one row; `next` is the next one still to come. */
  | { kind: 'meetings'; next: string }

export type Upcoming = {
  /** The nearest dated event or meeting — shown as the feature card. */
  feature: ClubEvent | null
  /** Everything after the feature, by date; TBA events last. */
  rows: Row[]
}

export function upcoming(today: string): Upcoming {
  const dated = events
    .filter((e): e is ClubEvent & { date: string } => e.date !== null && e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
  const tba = events.filter((e) => e.date === null)
  const meetingDates = occurrences(generalMeetings).filter((d) => d >= today)

  let feature: ClubEvent | null = dated[0] ?? null
  let rest: (ClubEvent & { date: string })[] = dated.slice(1)
  let meetings = meetingDates

  if (meetings.length && (!feature || meetings[0] < feature.date!)) {
    feature = {
      id: `meeting-${meetings[0]}`,
      title: 'General Meeting',
      em: generalMeetings.em,
      date: meetings[0],
      time: generalMeetings.time,
      where: generalMeetings.where,
      whereNote: generalMeetings.whereNote,
      description: generalMeetings.description,
    }
    rest = dated
    meetings = meetings.slice(1)
  }

  const rows: Row[] = rest.map((event) => ({ kind: 'event', event }))
  if (meetings.length) rows.push({ kind: 'meetings', next: meetings[0] })
  const key = (r: Row) => (r.kind === 'event' ? r.event.date! : r.next)
  rows.sort((a, b) => key(a).localeCompare(key(b)))
  for (const event of tba) rows.push({ kind: 'event', event })

  return { feature, rows }
}
