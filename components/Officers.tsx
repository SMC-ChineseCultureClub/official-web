import Image from 'next/image'

const CLUB_EMAIL = 'chineseculture.smc@gmail.com'
// Each person links to their own introduction post (`post` = the id in
// instagram.com/p/<id>/).
const postUrl = (id: string) => `https://www.instagram.com/p/${id}/`

// Photos are originals except Elenor Joy, Francesca and Xinke Zong, which are
// still crops of the Instagram introduction posts (docs/launch-plan.md). The
// contacts are shown larger because they're who people reach out to; everyone
// shares the club inbox rather than listing personal addresses.
const contacts = [
  { name: 'Diana Tian', post: 'Dc_gnrTCf4T', role: 'President', photo: '/board/diana-tian.webp' },
  { name: 'Grace Tian', post: 'Dc_hHU6ilj2', role: 'Vice President', photo: '/board/grace-tian.webp' },
  { name: 'Tygo', post: 'Dc_jhIAC9So', role: 'ICC Delegate', photo: '/board/tygo.webp' },
]

const members = [
  { name: 'Elenor Joy', post: 'Dc_jSuFiFS_', role: 'Treasurer', photo: '/board/elenor-joy.webp' },
  { name: 'Nicole Arevalo', post: 'Dc_jvqJiTXj', role: 'Secretary', photo: '/board/nicole-arevalo.webp' },
  { name: 'Peter Guan', post: 'Dc_lN5EKFVg', role: 'Website Coordinator', photo: '/board/peter-guan.webp' },
  { name: 'Joanna Shen', post: 'Dc_j5PdKOxp', role: 'Event Head', photo: '/board/joanna-shen.webp' },
  { name: 'Judy King', post: 'Dc_kCVyi96t', role: 'Event Organizer', photo: '/board/judy-king.webp' },
  { name: 'Francesca', post: 'Dc_kI8Kqi1C', role: 'Event Organizer', photo: '/board/francesca.webp' },
  { name: 'Celina Xiong', post: 'Dc_ka04iFy5', role: 'Event Organizer', photo: '/board/celina-xiong.webp' },
  { name: 'Tiffany', post: 'Dc_kS1hC88h', role: 'Event Organizer', photo: '/board/tiffany.webp' },
  { name: 'Xinke Zong', post: 'Dc_kiAZKEvu', role: 'Marketing Head', photo: '/board/xinke-zong.webp' },
  { name: 'Yurika Zhang', post: 'Dc_kq6YKuE1', role: 'Publicist', photo: '/board/yurika-zhang.webp' },
  { name: 'Hillary Wei', post: 'Dc_kwbsiK9X', role: 'Publicist', photo: '/board/hillary-wei.webp' },
  { name: 'Ryuhei AJ', post: 'Dc_lIUfwE_l', role: 'Publicist', photo: '/board/ryuhei-aj.webp' },
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
                <a className="officer__link" href={postUrl(p.post)} target="_blank" rel="noopener noreferrer">
                  <div className="officer__photo">
                    <Image src={p.photo} alt="" fill unoptimized sizes="(max-width: 520px) 30vw, 22vw" />
                  </div>
                  <div className="officer__body">
                    <p className="officer__role">{p.role}</p>
                    <h3 className="officer__name">{p.name}</h3>
                    <span className="sr-only">, on Instagram (opens in a new tab)</span>
                  </div>
                </a>
              </article>
            ))}
          </div>

          <ul className="members">
            {members.map((m) => (
              <li className="member" key={m.name}>
                <a className="member__link" href={postUrl(m.post)} target="_blank" rel="noopener noreferrer">
                  <div className="member__photo">
                    <Image src={m.photo} alt="" fill unoptimized sizes="120px" />
                  </div>
                  <p className="member__name">{m.name}</p>
                  <p className="member__role">{m.role}</p>
                  <span className="sr-only">, on Instagram (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="board__contact">
            <span className="board__hint">Tap anyone to meet them on Instagram.</span>
            Write to any of us at{' '}
            <a href={`mailto:${CLUB_EMAIL}`}>{CLUB_EMAIL}</a>
          </p>
        </div>
      </div>
      </div>
    </section>
  )
}
