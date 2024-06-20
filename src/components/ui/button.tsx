import { cn } from '@/domain/cn'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const buttonStyle = cva(
  'rounded px-6 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      intent: {
        primary: ['bg-primary', 'hover:bg-primary/80', 'text-base-white'],
        secondary: ['bg-secondary', 'text-base-black', 'hover:bg-secondary/80'],
        ghost: ['bg-primary/10', 'text-primary', 'hover:bg-primary/5'],
      },
      size: {
        small: ['text-sm', 'py-1', 'px-2'],
        medium: ['text-base', 'py-3', 'px-6'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  }
)

interface Props extends VariantProps<typeof buttonStyle> {
  children: React.ReactNode
  element?: 'button' | 'a' | 'div'
  onClick?: () => void
  className?: string
  href?: string
  [key: string]: any
}
export default function Button({
  children,
  element,
  className,
  intent,
  size,
  ...props
}: Props) {
  const Element = element || 'button'

  return (
    <Element
      className={cn(buttonStyle({ intent, size }), className)}
      {...props}
    >
      {children}
    </Element>
  )
}
