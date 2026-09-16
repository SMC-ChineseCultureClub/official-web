/**
 * Paper cover over the page while the brush loads (desktop only). Hidden unless
 * LOADER_SCRIPT in lib/sceneLoading.ts sets html[data-loader], which also lifts it.
 */
export default function PageLoader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader__inner">
        <span className="loader__seal">中</span>
        <span className="loader__stroke">
          <svg viewBox="0 0 240 28">
            <defs>
              <filter id="loader-dry-brush" x="-5%" y="-40%" width="110%" height="180%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9 0.08" numOctaves="2" seed="7" />
                <feDisplacementMap in="SourceGraphic" scale="3" />
              </filter>
            </defs>
            {/* 一, written as a 横: angled entry, a slim body rising slightly, and a pressed-down knob at the end. */}
            <path
              d="M5 10 C12 8 20 9.5 28 11 C80 10.5 150 8.5 206 7.2 C216 5.5 226 5 232 7.5 C238 10 238 15 233 18 C228 20.5 220 19.5 212 16.5 C206 15.5 200 15.2 196 15.2 C140 16 80 17.5 30 19.5 C20 21 10 20 6 17 C3 15 3 12 5 10 Z"
              filter="url(#loader-dry-brush)"
            />
          </svg>
        </span>
        <span className="loader__label">Chinese Culture Club · Santa Monica College</span>
      </div>
    </div>
  )
}
