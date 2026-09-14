import Image from 'next/image'

const CLUB_EMAIL = 'chineseculture.smc@gmail.com'

// DEMO PHOTOS — cropped from the board introduction post on Instagram; replace
// with originals before launch (docs/launch-plan.md). The contacts are shown
// larger because they're who people reach out to; everyone shares the club
// inbox rather than listing personal addresses.
const contacts = [
  { name: 'Diana Tian', role: 'President', photo: '/board/diana-tian.webp' },
  { name: 'Grace Tian', role: 'Vice President', photo: '/board/grace-tian.webp' },
  { name: 'Tygo', role: 'ICC Delegate', photo: '/board/tygo.webp' },
]

const members = [
  { name: 'Elenor Joy', role: 'Treasurer', photo: '/board/elenor-joy.webp' },
  { name: 'Nicole Arevalo', role: 'Secretary', photo: '/board/nicole-arevalo.webp' },
  { name: 'Peter Guan', role: 'Website Coordinator', photo: '/board/peter-guan.webp' },
  { name: 'Joanna Shen', role: 'Event Head', photo: '/board/joanna-shen.webp' },
  { name: 'Judy King', role: 'Event Organizer', photo: '/board/judy-king.webp' },
  { name: 'Francesca', role: 'Event Organizer', photo: '/board/francesca.webp' },
  { name: 'Celina Xiong', role: 'Event Organizer', photo: '/board/celina-xiong.webp' },
  { name: 'Tiffany', role: 'Event Organizer', photo: '/board/tiffany.webp' },
  { name: 'Xinke Zong', role: 'Marketing Head', photo: '/board/xinke-zong.webp' },
  { name: 'Yurika Zhang', role: 'Publicist', photo: '/board/yurika-zhang.webp' },
  { name: 'Hillary Wei', role: 'Publicist', photo: '/board/hillary-wei.webp' },
  { name: 'Ryuhei AJ', role: 'Publicist', photo: '/board/ryuhei-aj.webp' },
]

export default function Officers() {
  return (
    <section id="officers" data-story-chapter="officers" data-rest-side="right" data-screen-label="05 Officers">
      <div className="chapter-content">
      <div className="wrap">
        <header className="section-head in">
          <p className="section-head__no"><span className="dot"></span>IV &nbsp;/&nbsp; The People Who Make It Run</p>
          <h2 className="section-head__title">
            The <span className="it">2026</span> board.
            <span className="cn">本 届 干 部</span>
          </h2>
        </header>

        <div className="board in">
          <div className="officers">
            {contacts.map((p) => (
              <article className="officer" key={p.name}>
                <div className="officer__photo">
                  <Image src={p.photo} alt={p.name} fill unoptimized sizes="(max-width: 520px) 30vw, 22vw" />
                </div>
                <div className="officer__body">
                  <p className="officer__role">{p.role}</p>
                  <h3 className="officer__name">{p.name}</h3>
                </div>
              </article>
            ))}
          </div>

          <ul className="members">
            {members.map((m) => (
              <li className="member" key={m.name}>
                <div className="member__photo">
                  <Image src={m.photo} alt="" fill unoptimized sizes="120px" />
                </div>
                <p className="member__name">{m.name}</p>
                <p className="member__role">{m.role}</p>
              </li>
            ))}
          </ul>

          <p className="board__contact">
            Write to any of us at{' '}
            <a href={`mailto:${CLUB_EMAIL}`}>{CLUB_EMAIL}</a>
          </p>
        </div>
      </div>
      </div>
    </section>
  )
}
