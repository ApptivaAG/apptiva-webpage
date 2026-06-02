'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import ChatInput from './chat-input'

export default function FloatingChatInput() {
  const pathname = usePathname()
  const [isAnyInlineVisible, setIsAnyInlineVisible] = useState(true)
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false)

  useEffect(() => {
    function subscribe() {
      const chatbot = (window as any).chatbot
      if (!chatbot) return
      chatbot.subscribe('ON_CHAT_WINDOW_STATE_CHANGE', (open: boolean) => {
        setIsChatWindowOpen(open)
      })
    }

    subscribe()

    window.addEventListener('chatbot:ready', subscribe)
    return () => window.removeEventListener('chatbot:ready', subscribe)
  }, [])

  useEffect(() => {
    // Reset to hidden state on route change
    setIsAnyInlineVisible(true)

    const inlineInputs = document.querySelectorAll('[data-chat-input="inline"]')

    if (inlineInputs.length === 0) {
      setIsAnyInlineVisible(false)
      return
    }

    const visibilityMap = new Map<Element, boolean>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap.set(entry.target, entry.isIntersecting)
        })
        const anyVisible = Array.from(visibilityMap.values()).some(Boolean)
        setIsAnyInlineVisible(anyVisible)
      },
      { threshold: 0 }
    )

    inlineInputs.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  if (isAnyInlineVisible || isChatWindowOpen) {
    return null
  }

  return (
    <div className="content pointer-events-none fixed bottom-0 left-0 right-0 z-50 animate-bounce-in pb-4">
      <ChatInput
        mode="floating-input"
        origin="floating-bottom"
        variant="blue-transparent"
        className="pointer-events-auto col-[content]"
      />
    </div>
  )
}
