'use client'

import { usePlausible } from 'next-plausible'
import { useEffect } from 'react'

export default function ChatbotAnalytics() {
  const plausible = usePlausible()

  useEffect(() => {
    let subscribed = false

    function subscribe() {
      if (subscribed) return
      const chatbot = (window as any).chatbot
      if (!chatbot) return
      subscribed = true
      chatbot.subscribe('ON_CHAT_WINDOW_STATE_CHANGE', (open: boolean) => {
        plausible('chat-window-state-change', {
          props: {
            state: open ? 'open' : 'close',
          },
        })
      })
      chatbot.subscribe('ON_FAB_CLICK', function onFabClick() {
        plausible('open-chat', {
          props: {
            origin: 'fab',
          },
        })
      })
    }

    subscribe()

    window.addEventListener('chatbot:ready', subscribe)
    return () => window.removeEventListener('chatbot:ready', subscribe)
  }, [])

  return null
}
