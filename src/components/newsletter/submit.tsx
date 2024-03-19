import Button from '../ui/button'
import { useFormStatus } from 'react-dom'
import { cn } from '@/utils/cn'

export function Submit() {
  const { pending } = useFormStatus()
  return (
    <Button
      className={cn('max-md:mt-4', pending && 'pointer-events-none opacity-40')}
      intent="secondary"
    >
      Abonnieren{pending && '...'}
    </Button>
  )
}
