'use client'

import Script from 'next/script'

export default function ChatbotScript() {
  return (
    <Script
      id="chatbot"
      data-server="https://chatbot.apptiva.ch/chatbot"
      strategy="lazyOnload"
      defer
      src="https://chatbot.apptiva.ch/chatbot/embed/bundle.js"
      onLoad={() => {
        window.dispatchEvent(new CustomEvent('chatbot:ready'))
      }}
    />
  )
}
