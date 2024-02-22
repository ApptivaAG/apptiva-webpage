import { cn } from '@/utils/cn'
import React from 'react'

type Level = 1 | 2 | 3 | 4 | 5 | 6

const getClassNameByLevel = (level: Level): string => {
  switch (level) {
    case 1:
      return 'text-[3rem] leading-[3rem] lg:text-[5rem] font-[600] lg:leading-[5.5rem]'
    case 2:
      return 'text-[2.5rem] leading-[2.7rem] lg:text-[4rem] font-[600] lg:leading-[4rem]'
    case 3:
      return 'text-[2rem] leading-[2.2rem] lg:text-[3rem] font-[600] lg:leading-[3.125rem]'
    case 4:
      return 'text-[1.6rem] leading-[1.8rem] lg:text-[2rem] font-[500] lg:leading-[2.5rem]'
    case 5:
      return 'text-[1.25rem] leading-[1.25rem] font-[600]'
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
