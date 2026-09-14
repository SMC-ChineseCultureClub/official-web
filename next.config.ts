import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'export',
  // Dev-only effect (production never double-mounts). The brush scene is loaded
  // client-side after hydration (components/BrushScene.tsx), so Strict Mode's
  // mount → unmount → remount hits react-three-fiber's Canvas: its unmount
  // disposes the renderer and forces WebGL context loss 500 ms later, on the
  // same canvas the remount has just reused. The brush flashes, then is gone.
  reactStrictMode: false,
}

export default config
