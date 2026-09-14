'use client'

import { useEffect, useState } from 'react'
import { pacificToday } from '@/lib/events'

/**
 * Today's Pacific date for date-dependent UI. Starts at the build date the server
 * rendered with (so hydration matches), then switches to the visitor's real date.
 */
export function useToday(buildDate: string) {
  const [today, setToday] = useState(buildDate)
  useEffect(() => setToday(pacificToday()), [])
  return today
}
