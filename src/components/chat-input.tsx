'use client'

import { usePlausible } from 'next-plausible'
import { HiSparkles } from 'react-icons/hi2'
import { useState, type FormEvent } from 'react'

export default function ChatInput(props: {
  mode: 'inline-input' | 'floating-input'
  className?: string
}) {
  const plausible = usePlausible()
  const [message, setMessage] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!message.trim()) return

    plausible('open-chat', {
      props: {
        origin: props.mode,
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
    <div
      {...(props.mode === 'inline-input' && { 'data-chat-input': 'inline' })}
      className={`w-full max-w-xl ${props.className ?? 'mt-32 md:mt-4'}`}
    >
      <form onSubmit={handleSubmit} className="relative">
        {props.mode === 'floating-input' && (
          <div className="absolute inset-0 h-full w-full overflow-clip rounded bg-primary/50" />
        )}
        <HiSparkles className="absolute left-5 top-1/2 z-10 size-8 -translate-y-1/2 text-base-white" />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Frage unsere KI ..."
          className={`w-full overflow-clip rounded border-2 bg-base-white/20 py-5 pl-16 pr-14 text-xl text-base-white backdrop-blur-lg placeholder:text-base-white/80 focus:outline-none focus:ring-2 focus:ring-primary-light ${props.mode === 'floating-input' ? 'border-primary/80' : 'border-base-white'}`}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-primary/90 p-4 text-base-white transition-colors hover:bg-primary/60"
          disabled={!message.trim()}
        >
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            width="1.4em"
            height="1.4em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2a15.99 15.99 0 00-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-.9 3.7-.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 .7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-.8 4.2-2.6 5-5 1.4-4.2-.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z"></path>
          </svg>
        </button>
      </form>
    </div>
  )
}
