import InstagramEmbed from '@/components/InstagramEmbed'

export default function Join() {
  return (
    <section className="join" id="join" data-story-chapter="join" data-rest-side="left" data-theme="ink" data-screen-label="06 Join">
      <div className="chapter-content">
      <div className="join__inner in">
        <div className="join__copy">
          <h2>Sit down <em>for a while.</em></h2>
          <p className="cn-line">我 们 在 等 你</p>
          <p className="join__lede">
            Every other Thursday&nbsp;· 11:15&nbsp;AM&nbsp;· HSS&nbsp;252 &mdash; just walk in
          </p>
        </div>

        <InstagramEmbed />
      </div>
      </div>
    </section>
  )
}
