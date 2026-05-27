'use client'

import { useEffect, useRef, useState } from 'react'

export default function StickyOnExit({
  children,
  floatingChildren: fixedChildren,
}: {
  children: React.ReactNode
  floatingChildren?: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isAboveViewport, setIsAboveViewport] = useState(false)
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false)

  useEffect(() => {
    function subscribe() {
      const chatbot = (window as any).chatbot
      if (!chatbot) return
      chatbot.subscribe('ON_CHAT_WINDOW_STATE_CHANGE', (open: boolean) => {
        console.log('chat window is', open ? 'open' : 'close')
        setIsChatWindowOpen(open)
      })
    }

    subscribe()

    window.addEventListener('chatbot:ready', subscribe)
    return () => window.removeEventListener('chatbot:ready', subscribe)
  }, [])

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
      {isAboveViewport && !isChatWindowOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex animate-bounce-in justify-center p-4">
          {fixedChildren ?? children}
        </div>
      )}
    </>
  )
}
