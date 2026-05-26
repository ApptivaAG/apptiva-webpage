'use client'

import { usePlausible } from 'next-plausible'
import { HiSparkles } from 'react-icons/hi2'
import { useEffect, useState, type FormEvent } from 'react'

export default function ChatInput(props: {
  className?: string
  bgBlue?: boolean
  hideChatFAB?: boolean
}) {
  const plausible = usePlausible()
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (props.hideChatFAB) {
      const wrapper = document.querySelector(
        '.chat-button-wrapper'
      ) as HTMLElement
      if (wrapper) {
        wrapper.style.display = 'none'
      }
    } else {
      const wrapper = document.querySelector(
        '.chat-button-wrapper'
      ) as HTMLElement
      if (wrapper) {
        wrapper.style.display = ''
      }
    }
  }, [props.hideChatFAB])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!message.trim()) return

    plausible('open-chat', {
      props: {
        origin: props.hideChatFAB ? 'floating-input' : 'inline-input',
      },
    })

    const chatbot = (window as any).chatbot
    if (chatbot) {
      chatbot.openChatWindow()
      chatbot.enterGuestMessage(message)
      setMessage('')
    }
  }

  return (
    <div className={`w-[80%] max-w-xl ${props.className ?? 'mt-32 md:mt-8'}`}>
      <form onSubmit={handleSubmit} className="relative">
        {props.bgBlue && (
          <div className="absolute inset-0 h-full w-full overflow-clip rounded bg-primary/50" />
        )}
        <HiSparkles className="absolute left-6 top-1/2 z-10 size-8 -translate-y-1/2 text-base-white/80" />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Frage unsere KI..."
          className="w-full overflow-clip rounded border-2 border-primary-dark/80 bg-base-white/20 py-5 pl-16 pr-14 text-xl text-base-white backdrop-blur-lg placeholder:text-base-white/80 focus:outline-none focus:ring-2 focus:ring-primary-light"
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
    </div>
  )
}
