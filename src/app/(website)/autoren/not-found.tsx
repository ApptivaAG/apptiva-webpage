import Link from 'next/link'
import Heading from '@/components/heading'
import Section from '@/components/section'

export default function AuthorNotFound() {
  return (
    <Section>
      <div className="content py-16">
        <Heading level={1} size={2}>
          Dieses Autorenprofil ist nicht verfügbar.
        </Heading>
        <Link className="mt-8 underline underline-offset-4" href="/ueber-uns">
          Zum Apptiva-Team →
        </Link>
      </div>
    </Section>
  )
}
