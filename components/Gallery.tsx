import Image from 'next/image'

// Tiles take their shape from position (.t-1 … .t-9 in globals.css), so order
// matters: 1 5:4 · 2 square · 3 3:4 · 4 square · 5 16:9 · 6 square · 7–9 4:5.
// Each file is already cropped to its tile's shape; 1, 5 and 8 turn into 3:2 on
// narrow screens, so those three keep room above and below the subject.
const archive = [
  { src: '/gallery/paper-cutting.webp', title: 'Paper-Cutting', date: 'Apr ’26',
    alt: 'Members holding up the paper-cuts they just made' },
  { src: '/gallery/butterfly-hairpin.webp', title: 'Butterfly Hairpin', date: 'Apr ’26',
    alt: 'A gold filigree butterfly hairpin inlaid with pastel shell, held in one hand' },
  { src: '/gallery/club-row.webp', title: 'Club Row', date: 'May ’26',
    alt: 'Officers in hanfu holding a paper dragon behind the club booth at Club Row' },
  { src: '/gallery/lacquer-fans.webp', title: 'Lacquer Fans', date: 'Nov ’25',
    alt: 'Hands holding freshly marbled lacquer fans over the dipping bowl' },
  { src: '/gallery/lantern-festival.webp', title: 'Lantern Festival', date: 'Apr ’26',
    alt: 'A full classroom holding up red calligraphy squares and paper-cuts' },
  { src: '/gallery/liuli-bracelet.webp', title: 'Liuli Bracelets', date: 'May ’26',
    alt: 'Threading colored-glaze beads onto a bracelet at a meeting' },
  { src: '/gallery/inlaid-hairpins.webp', title: 'Inlaid Hairpins', date: 'Apr ’26',
    alt: 'Two members bent over a desk assembling inlaid hairpins' },
  { src: '/gallery/spring-potluck.webp', title: 'Spring Potluck', date: 'May ’26',
    alt: 'The club gathered around picnic tables under the trees for a potluck' },
  { src: '/gallery/club-awareness.webp', title: 'Club Awareness', date: 'Mar ’26',
    alt: 'A member brushing calligraphy at the club’s outdoor table' },
]

export default function Gallery() {
  return (
    <section id="gallery" data-story-chapter="gallery" data-rest-side="corner" data-theme="ink" data-screen-label="04 Gallery">
      <div className="chapter-content">
      <div className="wrap">
        <header className="section-head in">
          <p className="section-head__no"><span className="dot"></span>III &nbsp;/&nbsp; Things We Have Done Together</p>
          <h2 className="section-head__title">
            A <span className="it">small</span> archive.
            <span className="cn">过 往 记 事</span>
          </h2>
        </header>

        <div className="gallery in">
          {archive.map((item, i) => (
            <figure className={`tile t-${i + 1}`} key={item.src}>
              <Image
                className="tile__img"
                src={item.src}
                alt={item.alt}
                fill
                unoptimized
                sizes="(max-width: 880px) 50vw, 40vw"
              />
              <figcaption className="caption">
                <span className="t">{item.title}</span>
                <span className="d">{item.date}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}
