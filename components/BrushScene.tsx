'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, type ComponentProps } from 'react'
import { SCENE_HIDDEN_QUERY } from '@/lib/brushChoreography'

// InkScene pulls in three.js, react-three-fiber and drei (~900 KB). Phones and
// reduced motion never show the brush, so the chunk is only requested once the
// desktop story layout actually applies.
const InkScene = dynamic(() => import('@/components/InkScene'), { ssr: false })

export default function BrushScene(props: ComponentProps<typeof InkScene>) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hidden = window.matchMedia(SCENE_HIDDEN_QUERY)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setShow(!hidden.matches && !reduced.matches)
    update()
    hidden.addEventListener('change', update)
    reduced.addEventListener('change', update)
    return () => {
      hidden.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])

  return show ? <InkScene {...props} /> : null
}
