'use client'

import { cn } from '@/domain/cn'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import style from './underline.module.css'

export default function Underline(props: {
  children?: React.ReactNode
  className?: string
}) {
  const [hovered, setHovered] = useState(false)
  const [key, setKey] = useState(0)

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px -20% 0px',
    threshold: 1,
  })

  useEffect(() => {
    if (hovered) setKey((k) => k + 1)
  }, [hovered])

  return (
    <span
      ref={ref}
      key={key}
      className={cn(
        style['highlighted-text'],
        inView && !hovered && style.animate,
        hovered && style.animate,
        props.className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {props.children}
    </span>
  )
}
