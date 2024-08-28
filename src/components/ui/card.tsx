import { cn } from '@/utils/cn'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const cardStyle = cva('rounded-lg border overflow-clip bg-clip-padding', {
  variants: {
    intent: {
      light: ['bg-base-white', 'text-primary'],
      dark: ['bg-primary', 'text-base-white'],
    },
    padding: {
      default: 'p-6 md:p-9',
      small: 'p-4 md:p-6',
      none: '',
    },
  },
  defaultVariants: {
    intent: 'light',
    padding: 'default',
  },
})
export function Card(
  props: {
    children: React.ReactNode
    className?: string
  } & VariantProps<typeof cardStyle>
) {
  return (
    <div
      className={cn(
        cardStyle({ intent: props.intent, padding: props.padding }),
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
