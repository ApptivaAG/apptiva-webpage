import Button from './ui/button'
import { useFormStatus } from 'react-dom'
import { cn } from '@/utils/cn'

export function Submit(props: {
  children: React.ReactNode
  className?: string
  intent?: 'secondary' | 'primary'
}) {
  const { pending } = useFormStatus()
  const intent = props.intent ?? 'secondary'
  return (
    <Button
      className={cn(
        'max-md:mt-4',
        props.className,
        pending && 'pointer-events-none opacity-40'
      )}
      intent={intent}
      type="submit"
    >
      {pending ? `${props.children}...` : props.children}
    </Button>
  )
}
