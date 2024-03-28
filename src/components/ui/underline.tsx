'use client'

import { cn } from '@/utils/cn'
import { useInView } from 'react-intersection-observer'
import style from './underline.module.css'

export default function Underline(props: {
  children?: React.ReactNode
  className?: string
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px -20% 0px',
    threshold: 1,
  })
  return (
    <span
      ref={ref}
      className={cn(
        style['highlighted-text'],
        inView && style.animate,
        props.className
      )}
    >
      {props.children}
    </span>
  )
}
