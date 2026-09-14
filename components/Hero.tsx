import NextEventCta from '@/components/NextEventCta'
import { pacificToday } from '@/lib/events'

export default function Hero() {
  return (
    <section className="hero" id="top" data-story-chapter="hero" data-rest-side="right" data-screen-label="01 Hero">
      <div className="chapter-content">
      <div className="hero__bg" aria-hidden="true">
        <span className="glyph glyph--1">国</span>
        <span className="glyph glyph--col">
          <span className="lead">中</span> 国 文 化 社 · 圣 塔 莫 妮 卡
        </span>
        <span className="hero__wash"></span>
      </div>

      <div className="hero__inner">
        <div className="reveal d-0">
          <p className="hero__eyebrow">
            <span className="rule"></span>
            SANTA MONICA COLLEGE &nbsp;·&nbsp; A STUDENT SOCIETY SINCE MMXXV
          </p>
        </div>

        <h1 className="hero__title">
          <span className="reveal d-1"><span>Chinese</span></span>
          <span className="reveal d-2">
            <span>
              <span className="em">Culture</span> <span className="amp">&amp;</span>
            </span>
          </span>
          <span className="reveal d-3"><span>Community.</span></span>
        </h1>

        <div className="hero__sub-row">
          <div className="reveal d-4">
            <p className="hero__cn">
              中 国 文 化 社{' '}
              <span className="small">— culture, shared among friends.</span>
            </p>
          </div>
          <div className="reveal d-5">
            <NextEventCta buildDate={pacificToday()} />
          </div>
        </div>

        <div className="hero__foot">
          <div className="hero__meta reveal d-5">
            <div><span className="num">11:15&nbsp;AM</span>until 12:30 PM</div>
            <div><span className="num">HSS&nbsp;252</span>where we meet</div>
            <div><span className="num">Thu</span>every other week</div>
          </div>
          <div className="hero__scroll" aria-hidden="true">
            Scroll <span className="v-rule"></span>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
