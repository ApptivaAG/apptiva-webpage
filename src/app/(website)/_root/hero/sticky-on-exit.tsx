'use client'

import { useEffect, useRef, useState } from 'react'

export default function StickyOnExit({ children, fixedChildren }: { children: React.ReactNode; fixedChildren?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isAboveViewport, setIsAboveViewport] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.bottom < 0) {
          setIsAboveViewport(true)
        } else {
          setIsAboveViewport(false)
        }
      },
      { threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={ref}>{children}</div>
      {isAboveViewport && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 flex justify-center animate-bounce-in"
        >
          {fixedChildren ?? children}
        </div>
      )}
    </>
  )
}
