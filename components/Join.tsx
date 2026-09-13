import InstagramEmbed from '@/components/InstagramEmbed'

export default function Join() {
  return (
    <section className="join" id="join" data-story-chapter="join" data-rest-side="left" data-theme="ink" data-screen-label="06 Join">
      <div className="chapter-content">
      <div className="join__inner in">
        <div className="join__copy">
          <h2>Sit down <em>for a while.</em></h2>
          <p className="cn-line">我 们 在 等 你</p>
          <p className="join__lede">Open to everyone &nbsp;·&nbsp; No dues &nbsp;·&nbsp; Just walk in</p>
          <div className="actions">
            <a
              className="btn-solid"
              href="https://www.instagram.com/smc.ccc_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow us on Instagram <span className="join__handle">@smc.ccc_</span>
            </a>
          </div>
        </div>

        <div className="join__details">
          <dl className="join__where">
            <dt>When we meet</dt>
            <dd>
              Every other Thursday
              <span className="small">11:15 AM — 12:30 PM</span>
            </dd>
            <dt>Where to find us</dt>
            <dd>
              HSS 252
              <span className="small">Humanities &amp; Social Science · 1900 Pico Blvd</span>
            </dd>
            <dt>Faculty advisor</dt>
            <dd>
              Li Lei &amp; Han Meimei
              <span className="small">Department of Modern Languages</span>
            </dd>
          </dl>
          <InstagramEmbed />
        </div>
      </div>
      </div>
    </section>
  )
}
