'use client'

import React, { useEffect } from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'

export default function Typewriter(props: { text: string }) {
  const [cursor, setCursor] = React.useState(true)
  const [text, { isDone }] = useTypewriter({
    words: [props.text],
    typeSpeed: 50,
  })

  // useEffect to hide cursor after typewriter is done for 3 seconds
  useEffect(() => {
    if (isDone) {
      const timeout = setTimeout(() => {
        setCursor(false)
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [isDone])

  return (
    <h1 className="min-h-52 whitespace-break-spaces text-4xl font-bold md:min-h-96 md:text-7xl">
      <span dangerouslySetInnerHTML={{ __html: text }}></span>
      {cursor && <Cursor cursorColor="rgb(var(--secondary))" />}
    </h1>
  )
}
