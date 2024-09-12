import { cn } from '@/utils/cn'
import { VariantProps, cva } from 'class-variance-authority'

const sectionStyle = cva('full', {
  variants: {
    intent: {
      dark: 'bg-primary text-base-white',
      light: 'text-primary',
      lightGray: 'bg-base-grey text-primary',
    },
    level: {
      one: 'py-8 lg:py-28',
      two: 'pb-8 lg:pb-28',
    },
  },
  defaultVariants: {
    intent: 'light',
    level: 'one',
  },
})
export default function Section(
  props: VariantProps<typeof sectionStyle> & {
    children: React.ReactNode
    className?: string
    id?: string
  }
) {
  return (
    <>
      <section
        id={props.id}
        className={cn(
          sectionStyle({ intent: props.intent, level: props.level }),
          props.className
        )}
      >
        {props.children}
      </section>
    </>
  )
}
