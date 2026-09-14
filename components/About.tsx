const activities = [
  { what: 'Calligraphy', note: <><span lang="zh">福</span> characters, spring couplets</> },
  { what: 'Crafts', note: 'Plaster figurines, cloisonné' },
  { what: 'Games', note: 'Trivia on festivals and traditions' },
  { what: 'Potlucks', note: 'And holiday events with other clubs' },
]

export default function About() {
  return (
    <section id="about" data-story-chapter="about" data-rest-side="left" data-theme="ink" data-screen-label="02 About">
      <div className="chapter-content">
      <div className="wrap">
        <header className="section-head in">
          <p className="section-head__no"><span className="dot"></span>I &nbsp;/&nbsp; About the Club</p>
          <h2 className="section-head__title">
            Good <span className="it">company,</span> <br />and a little <span className="it">culture.</span>
            <span className="cn">关 于 我 们</span>
          </h2>
        </header>

        <div className="about__body in">
          <p className="about__lead">
            A place at SMC to <em>make friends</em>, with Chinese culture as the thread that ties
            it together.
          </p>

          <ul className="about__do">
            {activities.map(({ what, note }) => (
              <li key={what}>
                <span className="about__do-what">{what}</span>
                <span className="about__do-note">{note}</span>
              </li>
            ))}
          </ul>

          <p className="about__closing">
            No fluency, no prior knowledge, no Chinese surname required. Only curiosity, and a
            willingness to listen.
          </p>
        </div>
      </div>
      </div>
    </section>
  )
}
