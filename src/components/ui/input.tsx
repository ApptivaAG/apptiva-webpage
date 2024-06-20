import * as React from 'react'

import { cn } from '@/domain/cn'
import { VariantProps, cva } from 'class-variance-authority'

const inputStyle = cva(
  'ring-offset-white file:font-medium flex h-12 w-full rounded border border-base-white px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      intent: {
        default: ['bg-white border-primary'],
        outline: ['bg-transparent'],
      },
    },
    defaultVariants: {
      intent: 'default',
    },
  }
)
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputStyle>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, intent, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputStyle({ intent }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
