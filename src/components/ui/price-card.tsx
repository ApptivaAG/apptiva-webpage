import { cn } from '@/domain/cn'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const cardStyle = cva('rounded-lg p-9 border', {
  variants: {
    intent: {
      light: ['bg-base-white', 'text-primary'],
      dark: ['bg-primary', 'text-base-white'],
    },
  },
  defaultVariants: {
    intent: 'light',
  },
})
export function PriceCard(
  props: {
    children: React.ReactNode
    className?: string
  } & VariantProps<typeof cardStyle>
) {
  return (
    <div className="">
      <div className={cn(cardStyle({ intent: props.intent }), props.className)}>
        {props.children}
      </div>
    </div>
  )
}
