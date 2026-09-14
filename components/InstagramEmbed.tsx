'use client'

import { useEffect, useRef, useState } from 'react'

const HANDLE = 'smc.ccc_'
const PROFILE = `https://www.instagram.com/${HANDLE}/`

type InstgrmWindow = Window & {
  instgrm?: { Embeds: { process: () => void } }
}

/**
 * Instagram profile embed, mounted inside the Join section.
 *
 * Meta's embed.js renders a cross-origin iframe we cannot style, and what it
 * returns is not deterministic: a fresh request usually yields the profile card
 * plus a 2x3 grid of recent posts, but Instagram throttles repeated logged-out
 * requests down to a bare avatar card, and tracking-prevention blocks the script
 * outright for some visitors. So the surrounding frame — heading, handle, and
 * the link out — carries the section on its own; the iframe is a bonus rather
 * than the payload. See docs/instagram-embed.md.
 */
export default function InstagramEmbed() {
  const frameRef = useRef<HTMLDivElement>(null)
  const holderRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [failed, setFailed] = useState(false)

  // Don't contact Meta at all until the reader approaches the embed — most
  // visitors never scroll this far, and there is no reason to hand Instagram
  // their IP for something they will not see.
  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const holder = holderRef.current
    if (!holder) return
    const w = window as InstgrmWindow
    let retries = 0
    let timer: ReturnType<typeof setTimeout> | undefined

    // The blockquote is inserted imperatively, into a div React renders empty.
    // embed.js *replaces* this node with an iframe, so if React owned it any
    // later re-render would try to reconcile a node that is no longer there —
    // which throws NotFoundError: removeChild. Keeping it outside React's tree
    // removes that whole class of failure.
    holder.innerHTML = ''
    const quote = document.createElement('blockquote')
    quote.className = 'instagram-media'
    quote.setAttribute('data-instgrm-permalink', PROFILE)
    quote.setAttribute('data-instgrm-version', '14')
    quote.setAttribute(
      'style',
      'background:#FFF;border:0;margin:0 auto;max-width:540px;width:100%;padding:0',
    )
    holder.appendChild(quote)

    const process = () => w.instgrm?.Embeds.process()

    // An iframe existing is NOT the same as the embed having rendered. When
    // Instagram throttles the request it still creates the frame but never
    // sends content or a resize message, leaving it about 2px tall — so check
    // the height, not merely the element's presence, or the fallback can never
    // fire and the reader gets an empty box.
    const MIN_USEFUL_HEIGHT = 120
    const poll = () => {
      timer = setTimeout(() => {
        const iframe = holderRef.current?.querySelector('iframe')
        if (iframe && iframe.getBoundingClientRect().height >= MIN_USEFUL_HEIGHT) return
        retries += 1
        if (retries < 4) {
          if (!iframe) process()
          poll()
        } else {
          setFailed(true)
        }
      }, 2000)
    }

    if (w.instgrm) {
      process()
      poll()
    } else {
      const script = document.createElement('script')
      script.src = 'https://www.instagram.com/embed.js'
      script.async = true
      script.onload = () => {
        process()
        poll()
      }
      script.onerror = () => setFailed(true)
      document.body.appendChild(script)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [inView])

  return (
    <div className="ig__frame" ref={frameRef}>
      {/* Rendered empty on purpose — the effect fills it. See above. */}
      <div className={failed ? 'ig__embed is-hidden' : 'ig__embed'} ref={holderRef} />
      {failed && (
        <a className="ig__fallback" href={PROFILE} target="_blank" rel="noopener noreferrer">
          <span className="ig__fallback-cn">消 息</span>
          <span className="ig__fallback-text">
            Instagram could not load here.
            <br />
            See the latest at <strong>@{HANDLE}</strong>
          </span>
        </a>
      )}
    </div>
  )
}
