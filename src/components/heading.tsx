import { cn } from '@/utils/cn'
import React from 'react'

type Level = 1 | 2 | 3 | 4 | 5 | 6

const getClassNameByLevel = (level: Level): string => {
  switch (level) {
    case 1:
      return 'text-[7.5rem] font-[900] leading-[6.25rem]'
    case 2:
      return 'text-[4rem] font-[600] leading-[4rem]'
    case 3:
      return 'text-[3rem] font-[600] leading-[3.125rem]'
    case 4:
      return 'text-[2rem] font-[600] leading-[2.5rem]'
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
        props.className
      ),
    },
    props.children
  )
}
