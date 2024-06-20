import Heading from '@/components/heading'
import Section from '@/components/section'
import Button from '@/components/ui/button'
import UnderlineForLink from '@/components/ui/underline-for-link'
import { servicesQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import portableTextToString from '@/domain/portable-text-to-string'
import Link from 'next/link'
import RootLayout from './(website)/layout'

export default async function NotFound() {
  const { published } = await load(servicesQuery, undefined, undefined, [
    'service-page',
  ])

  return (
    <RootLayout>
      <Section className="content middle-grid">
        <Heading level={1} size={2} className="py-28 text-center">
          Diese Seite gibt es leider nicht...
        </Heading>

        <Heading level={2} size={4} className="py-12">
          Vielleicht hilft dir einer der folgenden Links weiter:
        </Heading>

        <div className="col-left">
          <Heading level={3} size={5} className="pb-4 pt-8">
            Development
          </Heading>
          <ul>
            {published
              .filter(({ subPageOf }) => subPageOf?.slug === 'development')
              .map(
                (service) =>
                  service?.header?.title && (
                    <li key={service._id} className="list-disc py-1">
                      <Link href={`/angebot/development/${service.slug}`}>
                        <UnderlineForLink>
                          {portableTextToString(service.header.title)}
                        </UnderlineForLink>
                      </Link>
                    </li>
                  )
              )}
          </ul>
        </div>

        <div className="col-right">
          <Heading level={3} size={5} className="pb-4 pt-8">
            Chatbots
          </Heading>
          <ul>
            {published
              .filter(({ subPageOf }) => subPageOf?.slug === 'chatbots')
              .map(
                (service) =>
                  service?.header?.title && (
                    <li key={service._id} className="list-disc py-1">
                      <Link href={`/angebot/chatbots/${service.slug}`}>
                        <UnderlineForLink>
                          {portableTextToString(service.header.title)}
                        </UnderlineForLink>
                      </Link>
                    </li>
                  )
              )}
          </ul>
        </div>
      </Section>

      <Link href={'/'}>
        <Button element="div" className="mx-auto my-20 w-fit">
          Zurück zur Startseite
        </Button>
      </Link>
    </RootLayout>
  )
}
