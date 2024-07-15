import { cn } from '@/utils/cn'
import style from './underline-for-link.module.css'

export default function UnderlineForLink(props: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn(style['highlighted-text'], props.className)}>
      {props.children}
    </span>
  )
}
