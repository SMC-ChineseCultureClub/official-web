import EventsBoard from '@/components/EventsBoard'
import { pacificToday } from '@/lib/events'

export default function Events() {
  return (
    <section id="events" data-story-chapter="events" data-rest-side="right" data-screen-label="03 Events">
      <div className="chapter-content">
      <div className="wrap">
        <header className="section-head in">
          <p className="section-head__no"><span className="dot"></span>II &nbsp;/&nbsp; Upcoming Gatherings</p>
          <h2 className="section-head__title">
            The <span className="it">season</span> ahead.
            <span className="cn">即 将 举 行</span>
          </h2>
        </header>

        {/* One stable .in wrapper: ScrollReveal only picks up elements present on
            mount, and the board swaps its children once it knows today's date. */}
        <div className="in">
          <EventsBoard buildDate={pacificToday()} />
        </div>
      </div>
      </div>
    </section>
  )
}
