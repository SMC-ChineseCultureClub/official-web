import Image from 'next/image'

// DEMO ONLY — cropped from Instagram screenshots to preview the layout for the
// board. Replace with the original photos before launch (docs/launch-plan.md).
// Tiles take their shape from position (.t-1 … .t-9 in globals.css), so order
// matters: 1 5:4 · 2 square · 3 3:4 · 4 square · 5 16:9 · 6 square · 7–9 4:5.
// `focus` is the object-position that keeps the subject in frame.
const archive = [
  { src: '/gallery/lantern-festival.webp', title: 'Lantern Festival', date: 'Apr ’26',
    alt: 'A classroom of members paper-cutting at the Lantern Festival meeting' },
  { src: '/gallery/club-row.webp', title: 'Club Row', date: 'May ’26', focus: '50% 30%',
    alt: 'Officers holding a paper dragon behind the club booth at Club Row' },
  { src: '/gallery/lacquer-fan-brush.webp', title: 'Calligraphy on Lacquer Fans', date: 'Nov ’25',
    alt: 'A marbled lacquer fan brushed with calligraphy' },
  { src: '/gallery/enamel-lions.webp', title: 'Plaster Lions', date: 'May ’26',
    alt: 'Members painting small plaster guardian lions' },
  { src: '/gallery/club-awareness.webp', title: 'Club Awareness', date: 'Mar ’26', focus: '50% 60%',
    alt: 'Members at the Club Awareness booth holding calligraphy and paper-cuts' },
  { src: '/gallery/liuli-bracelet.webp', title: 'Liuli Bracelets', date: 'May ’26',
    alt: 'A handmade colored-glaze bead bracelet on a wrist' },
  { src: '/gallery/lacquer-fans.webp', title: 'Lacquer Fans', date: 'Nov ’25',
    alt: 'Hands holding freshly marbled lacquer fans over the dipping bowl' },
  { src: '/gallery/international-day.webp', title: 'International Day', date: 'May ’25', focus: '50% 30%',
    alt: 'A guzheng performance at the club booth on the Quad' },
  { src: '/gallery/mid-autumn.webp', title: 'Mid-Autumn Festival', date: 'Oct ’25',
    alt: 'Mooncakes and gifts laid out for the Mid-Autumn meeting' },
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
                style={item.focus ? { objectPosition: item.focus } : undefined}
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
