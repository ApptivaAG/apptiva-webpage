import Link from 'next/link'
import Button from '@/components/ui/button'

export default function PrevNextNavigation(props: {
  basePath: string
  previousSlug?: string
  nextSlug?: string
  previousLabel: string
  nextLabel: string
  className?: string
}) {
  const { basePath, previousSlug, nextSlug, previousLabel, nextLabel } = props

  if (!previousSlug && !nextSlug) return null

  return (
    <div className={`flex justify-between gap-4 pt-8 ${props.className ?? ''}`}>
      {previousSlug ? (
        <Link href={`${basePath}/${previousSlug}`} className="no-underline">
          <Button
            intent="primary"
            element="div"
            className="flex items-center gap-4"
          >
            <span className="text-l">←</span>
            {previousLabel}
          </Button>
        </Link>
      ) : (
        <div />
      )}
      {nextSlug && (
        <Link href={`${basePath}/${nextSlug}`} className="no-underline">
          <Button
            intent="primary"
            element="div"
            className="flex items-center gap-4"
          >
            {nextLabel}
            <span className="text-l">→</span>
          </Button>
        </Link>
      )}
    </div>
  )
}
