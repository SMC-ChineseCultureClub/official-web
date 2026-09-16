// Getting the brush on screen before the page is revealed.
//
// On desktop the page opens under a paper cover (components/PageLoader.tsx) that
// lifts once InkScene has drawn its first frame. LOADER_SCRIPT runs inline in
// <head>, before first paint, so the cover is never flashed on phones or under
// reduced motion, and never shows at all without JavaScript.

import { SCENE_HIDDEN_QUERY } from '@/lib/brushChoreography'

export const BRUSH_MODEL_URL = '/models/chinese-calligraphy-brush/source/Chinese Calligraphy Brush.glb'
// Poly Haven's "Empty Warehouse 01" (CC0), the same file drei's `warehouse`
// preset fetches from a CDN at runtime.
export const ENVIRONMENT_URL = '/models/environment/empty_warehouse_01_1k.hdr'

/** Dispatched on window by InkScene once the brush has been drawn. */
export const BRUSH_READY_EVENT = 'brush-ready'

/** The inverse of SCENE_HIDDEN_QUERY, plus motion allowed: where InkScene loads. */
export const SCENE_SHOWN_MEDIA = [
  ...SCENE_HIDDEN_QUERY.split(',').map((q) => `(not (${q.trim()}))`),
  '(prefers-reduced-motion: no-preference)',
].join(' and ')

// Longest the cover holds the page, counted from the start of the HTML. On a slow
// connection the page shows without the brush, which fades in when it arrives.
const LOADER_MAX_MS = 5000

// Sets html[data-loader] to "loading", then "done" when the brush is drawn, the
// time runs out, or the viewport stops qualifying for the brush. The timeout is
// armed first so nothing after it can leave the page covered.
export const LOADER_SCRIPT = `(function () {
  var hidden = matchMedia(${JSON.stringify(SCENE_HIDDEN_QUERY)});
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (hidden.matches || reduced.matches) return;
  var html = document.documentElement;
  function lift() { html.setAttribute('data-loader', 'done'); }
  html.setAttribute('data-loader', 'loading');
  setTimeout(lift, ${LOADER_MAX_MS});
  addEventListener(${JSON.stringify(BRUSH_READY_EVENT)}, lift, { once: true });
  hidden.addEventListener('change', lift, { once: true });
  reduced.addEventListener('change', lift, { once: true });
})();`
