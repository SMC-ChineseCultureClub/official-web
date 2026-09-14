'use client'

import { useEffect, useRef, useState } from 'react'
import BrushScene from '@/components/BrushScene'
import type { ScrollState } from '@/components/InkScene'
import {
  CHAPTER_IDS,
  type ChapterId,
  type TransitionId,
} from '@/lib/brushChoreography'

const chapterLabels: Record<ChapterId, string> = {
  hero: 'Invocation',
  about: 'Origins',
  events: 'Gatherings',
  gallery: 'Archive',
  officers: 'Board',
  join: 'Invitation',
  epigraph: 'Closing',
}

const themeForChapter: Record<ChapterId, 'tea' | 'ink'> = {
  hero: 'tea',
  about: 'ink',
  events: 'tea',
  gallery: 'ink',
  officers: 'tea',
  join: 'ink',
  epigraph: 'tea',
}

// Events and Board have no mark: the brush rests on the right there, so their
// content starts at the left edge, right where the mark would sit on top of it.
const chapterMarks: Partial<Record<ChapterId, { glyph: string; phrase: string }>> = {
  hero:     { glyph: '墨', phrase: '一笔起势' },
  about:    { glyph: '文', phrase: '文化有根' },
  gallery:  { glyph: '集', phrase: '记忆成卷' },
  join:     { glyph: '来', phrase: '来者入席' },
  epigraph: { glyph: '诗', phrase: '落笔成章' },
}

type RestSeg = { kind: 'rest'; chapter: ChapterId; el: HTMLElement; top: number; bottom: number; mid: number }
type TransSeg = { kind: 'transition'; id: TransitionId; from: ChapterId; to: ChapterId; el: HTMLElement; top: number; bottom: number }
type Seg = RestSeg | TransSeg

export default function StoryShell({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLElement | null>(null)
  const scrollStateRef = useRef<ScrollState>({
    segment: { kind: 'rest', chapter: 'hero' },
    localProgress: 0,
    narrativeProgress: 0,
    theme: 'tea',
    restMidY: null,
  })
  const [activeChapter, setActiveChapter] = useState<ChapterId>('hero')
  const [narrativeProgress, setNarrativeProgress] = useState(0)

  useEffect(() => {
    document.documentElement.dataset.theme = themeForChapter[activeChapter]
    return () => {
      delete document.documentElement.dataset.theme
    }
  }, [activeChapter])

  useEffect(() => {
    let rafId: number | null = null
    let pendingMeasure = true
    let segments: Seg[] = []
    const restByChapter = new Map<ChapterId, RestSeg>()

    // Under reduced motion the transition spacers are display:none (height 0) and the
    // brush scene is gone, so transition segments are skipped entirely: --fade stays
    // at 1 everywhere and the page becomes a plain stacked flow.
    const rmMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = rmMedia.matches
    const onRmChange = () => {
      reducedMotion = rmMedia.matches
      pendingMeasure = true
      schedule()
    }
    rmMedia.addEventListener('change', onRmChange)

    const buildSegments = (): Seg[] => {
      const root = rootRef.current
      if (!root) return []
      const nodes = Array.from(
        root.querySelectorAll<HTMLElement>('[data-story-chapter], [data-story-transition]'),
      )
      const out: Seg[] = []
      restByChapter.clear()
      const rootTop = root.getBoundingClientRect().top + window.scrollY
      for (const el of nodes) {
        const chapter = el.dataset.storyChapter
        const transition = el.dataset.storyTransition
        const rect = el.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const bottom = top + rect.height
        if (chapter && chapter !== 'footer') {
          // Midpoint from layout offsets (sections are direct children of the root, their
          // offsetParent) rather than the rect: the .in reveal holds a section 18px low
          // until it scrolls into view, and nothing re-measures once it settles.
          const mid = rootTop + el.offsetTop + el.offsetHeight / 2
          const seg: RestSeg = { kind: 'rest', chapter: chapter as ChapterId, el, top, bottom, mid }
          out.push(seg)
          restByChapter.set(seg.chapter, seg)
        } else if (transition && !reducedMotion) {
          const from = el.dataset.from as ChapterId
          const to = el.dataset.to as ChapterId
          out.push({ kind: 'transition', id: transition as TransitionId, from, to, el, top, bottom })
        }
      }
      out.sort((a, b) => a.top - b.top)
      return out
    }

    const findSegment = (focusY: number): Seg => {
      for (let i = 0; i < segments.length; i++) {
        const s = segments[i]
        if (focusY < s.top) return segments[i === 0 ? 0 : i - 1]
        if (focusY >= s.top && focusY < s.bottom) return s
      }
      return segments[segments.length - 1]
    }

    const update = () => {
      rafId = null
      if (pendingMeasure) {
        segments = buildSegments()
        pendingMeasure = false
      }
      if (!segments.length) return

      const viewportHeight = window.innerHeight
      const pageHeight = Math.max(document.documentElement.scrollHeight - viewportHeight, 1)
      // Without transition spacers (no brush) the closing epigraph is short, and a
      // fixed 45% focus line can bottom out above it, leaving Join's ink theme on.
      // Over the last stretch of scroll, slide the focus line down to the viewport's
      // bottom edge so the last chapter is always reached. The brush layout keeps the
      // fixed line: its join→epigraph choreography is scrubbed against it.
      const plainFlow = !segments.some((s) => s.kind === 'transition' && s.bottom > s.top)
      let focusFrac = 0.45
      if (plainFlow) {
        const ramp = viewportHeight * (1 - focusFrac)
        const t = Math.min(1, Math.max(0, 1 - (pageHeight - window.scrollY) / ramp))
        focusFrac += (1 - focusFrac) * t
      }
      const focusY = window.scrollY + viewportHeight * focusFrac
      const narrative = Math.min(1, Math.max(0, window.scrollY / pageHeight))

      const current = findSegment(focusY)
      const localProgress = Math.min(
        1,
        Math.max(0, (focusY - current.top) / Math.max(1, current.bottom - current.top)),
      )

      scrollStateRef.current.segment =
        current.kind === 'rest'
          ? { kind: 'rest', chapter: current.chapter }
          : { kind: 'transition', id: current.id }
      scrollStateRef.current.localProgress = localProgress
      scrollStateRef.current.narrativeProgress = narrative
      scrollStateRef.current.restMidY = current.kind === 'rest' ? current.mid : null

      // Theme follows the chapter the active-marker is on (pivots at t=0.5 in transitions).
      const pivotChapter: ChapterId =
        current.kind === 'rest'
          ? current.chapter
          : localProgress < 0.5
            ? current.from
            : current.to
      scrollStateRef.current.theme = themeForChapter[pivotChapter]

      // Per-chapter fade: 1 = fully visible, 0 = invisible.
      // Default to 1; only the from/to chapters of the active transition get reduced fade.
      for (const s of segments) {
        if (s.kind === 'rest') s.el.style.setProperty('--fade', '1')
      }
      if (current.kind === 'transition') {
        const fromEl = restByChapter.get(current.from)?.el
        const toEl = restByChapter.get(current.to)?.el
        if (fromEl) fromEl.style.setProperty('--fade', (1 - localProgress).toFixed(3))
        if (toEl) toEl.style.setProperty('--fade', localProgress.toFixed(3))
      }

      const nextActive: ChapterId =
        current.kind === 'rest'
          ? current.chapter
          : localProgress < 0.5
            ? current.from
            : current.to

      setActiveChapter((prev) => (prev === nextActive ? prev : nextActive))
      setNarrativeProgress((prev) =>
        Math.abs(prev - narrative) < 0.005 ? prev : narrative,
      )
    }

    const schedule = () => {
      if (rafId != null) return
      rafId = requestAnimationFrame(update)
    }

    const onScroll = () => schedule()
    const onResize = () => {
      pendingMeasure = true
      schedule()
    }

    // ResizeObserver picks up content-height changes (e.g., fonts loading) so chapter rects stay accurate.
    const ro = new ResizeObserver(() => {
      pendingMeasure = true
      schedule()
    })
    if (rootRef.current) ro.observe(rootRef.current)

    pendingMeasure = true
    schedule()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      if (rafId != null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      rmMedia.removeEventListener('change', onRmChange)
      ro.disconnect()
    }
  }, [])

  return (
    <div className="story-shell" data-active-chapter={activeChapter}>
      <BrushScene stateRef={scrollStateRef} />

      {/* Every mark stays mounted so the outgoing one can fade out while the incoming
          one (if the chapter has one) fades in. */}
      <div className="story-ideograms" aria-hidden="true">
        {CHAPTER_IDS.map((id) => {
          const mark = chapterMarks[id]
          if (!mark) return null
          return (
            <div className={`story-ideogram${activeChapter === id ? ' is-active' : ''}`} key={id}>
              <span className="story-ideogram__glyph">{mark.glyph}</span>
              <span className="story-ideogram__phrase">{mark.phrase}</span>
            </div>
          )
        })}
      </div>

      <aside className="story-rail" aria-hidden="true">
        <div className="story-rail__line">
          <span className="story-rail__fill" style={{ transform: `scaleY(${narrativeProgress || 0.02})` }} />
        </div>
        <div className="story-rail__labels">
          {CHAPTER_IDS.map((id, index) => (
            <span
              className={`story-rail__label${activeChapter === id ? ' is-active' : ''}`}
              key={id}
            >
              {String(index + 1).padStart(2, '0')} {chapterLabels[id]}
            </span>
          ))}
        </div>
      </aside>

      <main className="story-content" ref={rootRef}>
        {children}
      </main>
    </div>
  )
}
