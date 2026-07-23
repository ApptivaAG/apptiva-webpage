import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'
import { cn } from '@/utils/cn'

const buttonStyle = cva(
  'rounded px-6 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
  {
    variants: {
      intent: {
        primary: ['bg-primary', 'hover:bg-primary/80', 'text-base-white'],
        secondary: ['bg-secondary', 'text-base-black', 'hover:bg-secondary/80'],
        ghost: ['bg-primary/10', 'text-primary', 'hover:bg-primary/5'],
      },
      size: {
        small: ['text-sm', 'py-1', 'px-2'],
        'medium-small': ['text-base', 'py-1.5', 'px-4'],
        medium: ['text-base', 'py-3', 'px-6'],
        large: ['text-xl', 'py-5', 'px-10'],
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
