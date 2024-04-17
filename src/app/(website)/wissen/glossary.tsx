import GlossaryComponent from '@/components/glossary-entries'
import Heading from '@/components/heading'
import UnderlineForLink from '@/components/ui/underline-for-link'
import { GlossaryQueryData } from '@/sanity/lib/queries'
import Link from 'next/link'

export default function Glossar(props: { data: GlossaryQueryData }) {
  const glossaryEntries = props.data

  return (
    <>
      <section className="full py-16 text-primary">
        <div className="content">
          <Heading level={2} size={3} className="col-left">
            Glossar
          </Heading>
          <div className="col-right max-lg:mt-4">
            <p>
              Tauche ein in unser Glossar und erweitere dein Verständnis über
              Begriffe wie Chatbots, KI, und mehr.
              <br />
              <Link className="self-end" href={`/glossar`}>
                <UnderlineForLink>Alle Begriffe →</UnderlineForLink>
              </Link>
            </p>
          </div>
          {glossaryEntries && (
            <GlossaryComponent glossaryEntries={glossaryEntries.slice(0, 5)} />
          )}
        </div>
      </section>
    </>
  )
}
