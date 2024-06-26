import { cn } from '@/utils/cn'
import React from 'react'

type Level = 1 | 2 | 3 | 4 | 5 | 6

const getClassNameByLevel = (level: Level): string => {
  switch (level) {
    case 1:
      return 'text-4xl md:text-7xl'
    case 2:
      return 'text-3xl md:text-6xl'
    case 3:
      return 'text-2xl md:text-5xl'
    case 4:
      return 'text-xl md:text-3xl'
    case 5:
      return 'text-lg md:text-xl'
    default:
      return ''
  }
}

export default function Heading(
  props: {
    level: Level
    size?: Level
    className?: string
    children: React.ReactNode
  } & React.HTMLAttributes<HTMLHeadingElement>
) {
  return React.createElement(
    `h${props.level}`,
    {
      className: cn(
        getClassNameByLevel(props.size ?? props.level),
        'font-bold text-balance whitespace-break-spaces',
        props.className
      ),
    },
    props.children
  )
}
