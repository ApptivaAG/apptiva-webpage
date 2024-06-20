import { cn } from '@/domain/cn'

export default function UnderlineForLink(props: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'underline decoration-from-font underline-offset-2 hover:decoration-2 hover:underline-offset-2',
        props.className
      )}
    >
      {props.children}
    </span>
  )
}
