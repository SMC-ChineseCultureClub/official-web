export default function Epigraph() {
  return (
    <aside
      className="epigraph in"
      data-story-chapter="epigraph"
      data-rest-side="center"
      data-screen-label="07 Closing"
      aria-label="Closing verse"
    >
      <div className="chapter-content epigraph__content">
        <p className="epigraph__verse" aria-label="但愿人长久，千里共婵娟。">
          <span className="epigraph__couplet epigraph__couplet--left">
            <span className="epigraph__line">但 愿 人 长 久 ，</span>
            <span className="epigraph__trans">May we all be blessed with long life,</span>
          </span>
          <span className="epigraph__couplet epigraph__couplet--right">
            <span className="epigraph__line">千 里 <span className="accent">共</span> 婵 娟 。</span>
            <span className="epigraph__trans">and share this moon a thousand miles apart.</span>
          </span>
        </p>
      </div>
    </aside>
  )
}
