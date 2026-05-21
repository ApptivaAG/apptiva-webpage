'use client'

import { useState, type FormEvent } from 'react'

export default function ChatInput(props: { className?: string }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!message.trim()) return

    const chatbot = (window as any).chatbot
    if (chatbot) {
      chatbot.openChatWindow()
      chatbot.enterGuestMessage(message)
      setMessage('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative mx-auto w-full max-w-2xl ${props.className ?? 'mt-32'}`}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Stelle deine Frage zu Apptiva..."
        className="w-full rounded-full border-2 border-primary-dark/80 bg-base-white/20 px-8 py-5 pr-14 text-xl text-base-white placeholder:text-base-white/80 focus:outline-none focus:ring-2 focus:ring-primary-light"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-primary/90 p-4 text-base-white transition-colors hover:bg-primary/60"
        disabled={!message.trim()}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </form>
  )
}
