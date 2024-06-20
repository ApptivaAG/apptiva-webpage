import Button from './ui/button'
import { useFormStatus } from 'react-dom'
import { cn } from '@/domain/cn'

export function Submit(props: {
  children: React.ReactNode
  className?: string
}) {
  const { pending } = useFormStatus()
  return (
    <Button
      className={cn(
        'max-md:mt-4',
        props.className,
        pending && 'pointer-events-none opacity-40'
      )}
      intent="secondary"
      type="submit"
    >
      {pending ? `${props.children}...` : props.children}
    </Button>
  )
}
