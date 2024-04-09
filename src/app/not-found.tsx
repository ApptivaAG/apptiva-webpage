import Heading from '@/components/heading'
import Button from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <p className="py-20 text-center">
      <Heading level={1} size={3}>
        Diese Seite gibt es leider nicht...
      </Heading>
      <Link href={'/'}>
        <Button element="div" className="mx-auto my-20 w-fit">
          Zurück zur Startseite
        </Button>
      </Link>
    </p>
  )
}
