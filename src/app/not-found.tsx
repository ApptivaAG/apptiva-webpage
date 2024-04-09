import Heading from '@/components/heading'
import RootLayout from './(website)/layout'
import Button from '@/components/ui/button'
import Link from 'next/link'
import Section from '@/components/section'

export default function NotFound() {
  return (
    <RootLayout>
      <Section className="py-28 text-center">
        <Heading level={1} size={3}>
          Diese Seite gibt es leider nicht...
        </Heading>
        <Link href={'/'}>
          <Button element="div" className="mx-auto my-20 w-fit">
            Zurück zur Startseite
          </Button>
        </Link>
      </Section>
    </RootLayout>
  )
}
